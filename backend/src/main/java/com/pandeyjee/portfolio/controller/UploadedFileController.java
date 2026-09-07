package com.pandeyjee.portfolio.controller;

import com.pandeyjee.portfolio.service.FileStorageService;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@RestController
public class UploadedFileController {

    private final FileStorageService fileStorageService;

    public UploadedFileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<byte[]> getUploadedFile(@PathVariable String fileName) {
        try {
            FileStorageService.FilePayload payload = fileStorageService.loadFilePayload(fileName);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(payload.contentType()))
                    .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).cachePublic())
                    .body(payload.data());
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
