package com.pandeyjee.portfolio.controller;

import com.pandeyjee.portfolio.service.FileStorageService;
import org.springframework.http.CacheControl;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

@RestController
public class UploadedFileController {

    private final FileStorageService fileStorageService;

    public UploadedFileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @RequestMapping(value = "/uploads/{fileName:.+}", method = {RequestMethod.GET, RequestMethod.HEAD})
    public ResponseEntity<byte[]> getUploadedFile(@PathVariable String fileName) {
        try {
            FileStorageService.FilePayload payload = fileStorageService.loadFilePayload(fileName);
            String cleanFileName = (fileName != null && !fileName.isBlank()) ? fileName.trim() : "document";

            MediaType mediaType;
            try {
                mediaType = MediaType.parseMediaType(payload.contentType());
            } catch (Exception e) {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            }

            // Explicitly set inline Content-Disposition with the clean real filename
            // This prevents mobile browsers from defaulting to 'f.txt'
            ContentDisposition disposition = ContentDisposition.inline()
                    .filename(cleanFileName, StandardCharsets.UTF_8)
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(mediaType);
            headers.setContentDisposition(disposition);
            headers.setContentLength(payload.data().length);
            headers.set(HttpHeaders.ACCEPT_RANGES, "bytes");
            headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).cachePublic());

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(payload.data());
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
