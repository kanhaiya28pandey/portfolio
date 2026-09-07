package com.pandeyjee.portfolio.controller;

import com.pandeyjee.portfolio.dto.*;
import com.pandeyjee.portfolio.entity.Profile;
import com.pandeyjee.portfolio.service.ContactService;
import com.pandeyjee.portfolio.service.PortfolioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public")
public class PublicPortfolioController {

    private final PortfolioService portfolioService;
    private final ContactService contactService;
    private final com.pandeyjee.portfolio.service.AnalyticsService analyticsService;
    private final org.springframework.core.env.Environment environment;

    @org.springframework.beans.factory.annotation.Autowired(required = false)
    private javax.sql.DataSource dataSource;

    public PublicPortfolioController(
            PortfolioService portfolioService,
            ContactService contactService,
            com.pandeyjee.portfolio.service.AnalyticsService analyticsService,
            org.springframework.core.env.Environment environment) {
        this.portfolioService = portfolioService;
        this.contactService = contactService;
        this.analyticsService = analyticsService;
        this.environment = environment;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        String dbProduct = "Unknown";
        String dbUrl = "Unknown";
        if (dataSource != null) {
            try (java.sql.Connection conn = dataSource.getConnection()) {
                dbProduct = conn.getMetaData().getDatabaseProductName() + " " + conn.getMetaData().getDatabaseProductVersion();
                String rawUrl = conn.getMetaData().getURL();
                if (rawUrl != null) {
                    // Sanitize any credentials
                    if (rawUrl.contains("@")) {
                        dbUrl = rawUrl.substring(rawUrl.indexOf("@") + 1);
                    } else {
                        dbUrl = rawUrl;
                    }
                }
            } catch (Exception e) {
                dbProduct = "Connection Error: " + e.getMessage();
            }
        }
        String[] profiles = environment != null ? environment.getActiveProfiles() : new String[0];
        String activeProfile = profiles.length > 0 ? String.join(", ", profiles) : "default";

        long storedFilesCount = 0;
        List<String> sampleStoredFiles = new java.util.ArrayList<>();
        if (dataSource != null) {
            try (java.sql.Connection conn = dataSource.getConnection();
                 java.sql.Statement stmt = conn.createStatement()) {
                try (java.sql.ResultSet rs = stmt.executeQuery("SELECT file_name FROM stored_files ORDER BY id DESC LIMIT 10")) {
                    while (rs.next()) {
                        sampleStoredFiles.add(rs.getString(1));
                    }
                }
                try (java.sql.ResultSet rs = stmt.executeQuery("SELECT count(*) FROM stored_files")) {
                    if (rs.next()) {
                        storedFilesCount = rs.getLong(1);
                    }
                }
            } catch (Exception e) {
                sampleStoredFiles.add("DB Error: " + e.getMessage());
            }
        }

        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "portfolio-backend",
            "activeProfile", activeProfile,
            "databaseProduct", dbProduct,
            "databaseUrl", dbUrl,
            "storedFilesCount", storedFilesCount,
            "sampleStoredFiles", sampleStoredFiles,
            "lastStorageError", com.pandeyjee.portfolio.service.FileStorageService.lastStorageError != null ? com.pandeyjee.portfolio.service.FileStorageService.lastStorageError : "none",
            "timestamp", java.time.Instant.now().toString()
        ));
    }

    @GetMapping("/overview")
    public ResponseEntity<PortfolioOverviewDto> getOverview() {
        return ResponseEntity.ok(portfolioService.getOverview());
    }

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        return ResponseEntity.ok(portfolioService.getProfile());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillDto>> getSkills() {
        return ResponseEntity.ok(portfolioService.getPublishedSkills());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDto>> getProjects() {
        return ResponseEntity.ok(portfolioService.getPublishedProjects());
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<ProjectDto> getProjectBySlug(@PathVariable String slug) {
        return portfolioService.getProjectBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceDto>> getExperiences() {
        return ResponseEntity.ok(portfolioService.getPublishedExperiences());
    }

    @GetMapping("/educations")
    public ResponseEntity<List<EducationDto>> getEducations() {
        return ResponseEntity.ok(portfolioService.getPublishedEducations());
    }

    @GetMapping("/certificates")
    public ResponseEntity<List<CertificateDto>> getCertificates() {
        return ResponseEntity.ok(portfolioService.getPublishedCertificates());
    }

    @GetMapping("/achievements")
    public ResponseEntity<List<AchievementDto>> getAchievements() {
        return ResponseEntity.ok(portfolioService.getPublishedAchievements());
    }

    @GetMapping("/settings")
    public ResponseEntity<Map<String, String>> getSettings() {
        return ResponseEntity.ok(portfolioService.getSettingsMap());
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isBlank()) {
            return xRealIp.trim();
        }
        return request.getRemoteAddr();
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest servletRequest) {

        String ip = extractClientIp(servletRequest);
        contactService.submitContact(request, ip);
        return ResponseEntity.ok(Map.of("message", "Your message has been received! Pandey Jee will get back to you shortly."));
    }

    @PostMapping("/track-visit")
    public ResponseEntity<Map<String, String>> trackVisit(
            @RequestBody(required = false) Map<String, String> payload,
            HttpServletRequest servletRequest) {

        String ip = extractClientIp(servletRequest);
        String userAgent = servletRequest.getHeader("User-Agent");
        String referrer = payload != null ? payload.get("referrer") : servletRequest.getHeader("Referer");
        String pagePath = payload != null ? payload.get("pagePath") : "/";

        analyticsService.trackVisit(ip, userAgent, referrer, pagePath);
        return ResponseEntity.ok(Map.of("status", "tracked"));
    }
}
