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

    public PublicPortfolioController(
            PortfolioService portfolioService,
            ContactService contactService,
            com.pandeyjee.portfolio.service.AnalyticsService analyticsService) {
        this.portfolioService = portfolioService;
        this.contactService = contactService;
        this.analyticsService = analyticsService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> getHealth() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "portfolio-backend",
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
