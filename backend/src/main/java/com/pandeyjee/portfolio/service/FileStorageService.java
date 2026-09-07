package com.pandeyjee.portfolio.service;

import com.pandeyjee.portfolio.entity.StoredFile;
import com.pandeyjee.portfolio.repository.StoredFileRepository;
import org.apache.tika.Tika;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    private final Path uploadLocation;
    private final StoredFileRepository storedFileRepository;
    private final Tika tika = new Tika();

    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/svg+xml"
    );

    private static final List<String> ALLOWED_DOC_TYPES = Arrays.asList(
            "application/pdf"
    );

    private static final long MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
    private static final long MAX_DOC_SIZE = 10 * 1024 * 1024; // 10 MB

    public FileStorageService(
            @Value("${portfolio.storage.upload-dir:./uploads}") String uploadDir,
            StoredFileRepository storedFileRepository) {
        this.storedFileRepository = storedFileRepository;
        this.uploadLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadLocation);
        } catch (IOException e) {
            log.warn("Could not create local upload directory, will rely on database storage: {}", e.getMessage());
        }
    }

    public String storeFile(MultipartFile file, boolean allowDocuments) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store an empty file");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "file");

        if (originalFilename.contains("..")) {
            throw new IllegalArgumentException("Filename contains invalid path sequence: " + originalFilename);
        }

        String detectedMimeType;
        try (InputStream inputStream = file.getInputStream()) {
            detectedMimeType = tika.detect(inputStream, originalFilename);
        } catch (IOException e) {
            throw new RuntimeException("Failed to analyze file content", e);
        }

        boolean isAllowedImage = ALLOWED_IMAGE_TYPES.contains(detectedMimeType);
        boolean isAllowedDoc = allowDocuments && ALLOWED_DOC_TYPES.contains(detectedMimeType);

        if (!isAllowedImage && !isAllowedDoc) {
            throw new IllegalArgumentException("Disallowed file type: " + detectedMimeType + ". Only WebP, JPEG, PNG, SVG and PDF files are permitted.");
        }

        long maxAllowed = isAllowedDoc ? MAX_DOC_SIZE : MAX_IMAGE_SIZE;
        if (file.getSize() > maxAllowed) {
            throw new IllegalArgumentException("File size (" + file.getSize() + " bytes) exceeds maximum limit of " + maxAllowed + " bytes.");
        }

        String extension = "";
        int extIndex = originalFilename.lastIndexOf('.');
        if (extIndex > 0) {
            extension = originalFilename.substring(extIndex);
        }
        String uniqueFileName = UUID.randomUUID() + extension;

        byte[] fileBytes;
        try {
            fileBytes = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read uploaded file data", e);
        }

        // 1. Permanently store in PostgreSQL Cloud Database so restarts never lose files
        try {
            StoredFile storedFile = new StoredFile(
                    null,
                    uniqueFileName,
                    originalFilename,
                    detectedMimeType,
                    file.getSize(),
                    fileBytes,
                    LocalDateTime.now()
            );
            storedFileRepository.save(storedFile);
            log.info("File permanently saved to database: {} ({} bytes)", uniqueFileName, file.getSize());
        } catch (Exception e) {
            log.error("Failed to persist file in database: {}", e.getMessage(), e);
        }

        // 2. Also cache to local filesystem for high performance
        try {
            Path targetLocation = this.uploadLocation.resolve(uniqueFileName);
            Files.write(targetLocation, fileBytes, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            log.info("File successfully cached to disk: {}", uniqueFileName);
        } catch (IOException e) {
            log.warn("Could not cache file to disk (will serve from database): {}", e.getMessage());
        }

        return "/uploads/" + uniqueFileName;
    }

    public Optional<StoredFile> getStoredFile(String fileName) {
        return storedFileRepository.findByFileName(fileName);
    }

    public record FilePayload(byte[] data, String contentType) {}

    public FilePayload loadFilePayload(String fileName) throws IOException {
        Path filePath = this.uploadLocation.resolve(fileName).normalize();
        if (Files.exists(filePath) && Files.isReadable(filePath)) {
            byte[] data = Files.readAllBytes(filePath);
            String probeType = tika.detect(data, fileName);
            return new FilePayload(data, probeType != null ? probeType : "application/octet-stream");
        }

        // Fallback to database
        Optional<StoredFile> opt = storedFileRepository.findByFileName(fileName);
        if (opt.isPresent()) {
            StoredFile sf = opt.get();
            byte[] data = sf.getFileData();
            // restore to disk cache
            try {
                Files.write(filePath, data, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            } catch (Exception ignored) {}
            return new FilePayload(data, sf.getContentType());
        }

        throw new NoSuchFileException("File not found: " + fileName);
    }
}
