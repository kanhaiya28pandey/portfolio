package com.pandeyjee.portfolio.service;

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
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    private final Path uploadLocation;
    private final Tika tika = new Tika();

    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/svg+xml"
    );

    private static final List<String> ALLOWED_DOC_TYPES = Arrays.asList(
            "application/pdf"
    );

    private static final long MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
    private static final long MAX_DOC_SIZE = 10 * 1024 * 1024; // 10 MB

    public FileStorageService(@Value("${portfolio.storage.upload-dir:./uploads}") String uploadDir) {
        this.uploadLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize upload directory at " + uploadDir, e);
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

        try {
            Path targetLocation = this.uploadLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            log.info("File successfully saved: {} (detected MIME: {})", uniqueFileName, detectedMimeType);
            return "/uploads/" + uniqueFileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + uniqueFileName, e);
        }
    }
}
