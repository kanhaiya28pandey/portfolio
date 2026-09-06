package com.pandeyjee.portfolio.controller;

import com.pandeyjee.portfolio.dto.*;
import com.pandeyjee.portfolio.entity.*;
import com.pandeyjee.portfolio.entity.enums.MessageStatus;
import com.pandeyjee.portfolio.service.AdminService;
import com.pandeyjee.portfolio.service.ContactService;
import com.pandeyjee.portfolio.service.FileStorageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;
    private final ContactService contactService;
    private final FileStorageService fileStorageService;
    private final com.pandeyjee.portfolio.service.AnalyticsService analyticsService;

    public AdminController(
            AdminService adminService,
            ContactService contactService,
            FileStorageService fileStorageService,
            com.pandeyjee.portfolio.service.AnalyticsService analyticsService) {
        this.adminService = adminService;
        this.contactService = contactService;
        this.fileStorageService = fileStorageService;
        this.analyticsService = analyticsService;
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        return (ip == null || ip.isBlank()) ? request.getRemoteAddr() : ip;
    }

    @GetMapping("/dashboard/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalProjects", adminService.getAllProjects().size());
        summary.put("totalSkills", adminService.getAllSkills().size());
        summary.put("unreadMessages", contactService.getUnreadCount());
        summary.put("recentAuditLogs", adminService.getRecentAuditLogs());
        return ResponseEntity.ok(summary);
    }

    @PutMapping("/profile")
    public ResponseEntity<Profile> updateProfile(
            @RequestBody Profile profile,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateProfile(profile, userDetails.getUsername(), getClientIp(request)));
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(adminService.getAllProjects());
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectDto> createProject(
            @Valid @RequestBody ProjectDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.createProject(dto, userDetails.getUsername(), getClientIp(request)));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectDto> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateProject(id, dto, userDetails.getUsername(), getClientIp(request)));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String, String>> deleteProject(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        adminService.deleteProject(id, userDetails.getUsername(), getClientIp(request));
        return ResponseEntity.ok(Map.of("message", "Project deleted successfully"));
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        return ResponseEntity.ok(adminService.getAllSkills());
    }

    @PostMapping("/skills")
    public ResponseEntity<SkillDto> createSkill(
            @Valid @RequestBody SkillDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.createSkill(dto, userDetails.getUsername(), getClientIp(request)));
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<SkillDto> updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateSkill(id, dto, userDetails.getUsername(), getClientIp(request)));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Map<String, String>> deleteSkill(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        adminService.deleteSkill(id, userDetails.getUsername(), getClientIp(request));
        return ResponseEntity.ok(Map.of("message", "Skill deleted successfully"));
    }

    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceDto>> getAllExperiences() {
        return ResponseEntity.ok(adminService.getAllExperiences());
    }

    @PostMapping("/experiences")
    public ResponseEntity<ExperienceDto> createExperience(
            @Valid @RequestBody ExperienceDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.createExperience(dto, userDetails.getUsername(), getClientIp(request)));
    }

    @PutMapping("/experiences/{id}")
    public ResponseEntity<ExperienceDto> updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateExperience(id, dto, userDetails.getUsername(), getClientIp(request)));
    }

    @DeleteMapping("/experiences/{id}")
    public ResponseEntity<Map<String, String>> deleteExperience(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        adminService.deleteExperience(id, userDetails.getUsername(), getClientIp(request));
        return ResponseEntity.ok(Map.of("message", "Experience entry deleted successfully"));
    }

    @GetMapping("/educations")
    public ResponseEntity<List<EducationDto>> getAllEducations() {
        return ResponseEntity.ok(adminService.getAllEducations());
    }

    @PostMapping("/educations")
    public ResponseEntity<EducationDto> createEducation(
            @Valid @RequestBody EducationDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.createEducation(dto, userDetails.getUsername(), getClientIp(request)));
    }

    @PutMapping("/educations/{id}")
    public ResponseEntity<EducationDto> updateEducation(
            @PathVariable Long id,
            @Valid @RequestBody EducationDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateEducation(id, dto, userDetails.getUsername(), getClientIp(request)));
    }

    @DeleteMapping("/educations/{id}")
    public ResponseEntity<Map<String, String>> deleteEducation(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        adminService.deleteEducation(id, userDetails.getUsername(), getClientIp(request));
        return ResponseEntity.ok(Map.of("message", "Education entry deleted successfully"));
    }

    @GetMapping("/certificates")
    public ResponseEntity<List<CertificateDto>> getAllCertificates() {
        return ResponseEntity.ok(adminService.getAllCertificates());
    }

    @PostMapping("/certificates")
    public ResponseEntity<CertificateDto> createCertificate(
            @Valid @RequestBody CertificateDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.createCertificate(dto, userDetails.getUsername(), getClientIp(request)));
    }

    @PutMapping("/certificates/{id}")
    public ResponseEntity<CertificateDto> updateCertificate(
            @PathVariable Long id,
            @Valid @RequestBody CertificateDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateCertificate(id, dto, userDetails.getUsername(), getClientIp(request)));
    }

    @DeleteMapping("/certificates/{id}")
    public ResponseEntity<Map<String, String>> deleteCertificate(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        adminService.deleteCertificate(id, userDetails.getUsername(), getClientIp(request));
        return ResponseEntity.ok(Map.of("message", "Certificate deleted successfully"));
    }

    @GetMapping("/achievements")
    public ResponseEntity<List<AchievementDto>> getAllAchievements() {
        return ResponseEntity.ok(adminService.getAllAchievements());
    }

    @PostMapping("/achievements")
    public ResponseEntity<AchievementDto> createAchievement(
            @Valid @RequestBody AchievementDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.createAchievement(dto, userDetails.getUsername(), getClientIp(request)));
    }

    @PutMapping("/achievements/{id}")
    public ResponseEntity<AchievementDto> updateAchievement(
            @PathVariable Long id,
            @Valid @RequestBody AchievementDto dto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateAchievement(id, dto, userDetails.getUsername(), getClientIp(request)));
    }

    @DeleteMapping("/achievements/{id}")
    public ResponseEntity<Map<String, String>> deleteAchievement(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        adminService.deleteAchievement(id, userDetails.getUsername(), getClientIp(request));
        return ResponseEntity.ok(Map.of("message", "Achievement deleted successfully"));
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "allowDoc", defaultValue = "false") boolean allowDoc) {
        String fileUrl = fileStorageService.storeFile(file, allowDoc);
        return ResponseEntity.ok(Map.of("fileUrl", fileUrl));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getContactMessages(
            @RequestParam(value = "status", required = false) MessageStatus status) {
        if (status != null) {
            return ResponseEntity.ok(contactService.getMessagesByStatus(status));
        }
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @PatchMapping("/messages/{id}/status")
    public ResponseEntity<ContactMessage> updateMessageStatus(
            @PathVariable Long id,
            @RequestParam("status") MessageStatus status) {
        return ResponseEntity.ok(contactService.updateMessageStatus(id, status));
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, String>> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok(Map.of("message", "Message deleted successfully"));
    }

    @PostMapping("/messages/batch-delete")
    public ResponseEntity<Map<String, String>> deleteMessagesBatch(@RequestBody List<Long> ids) {
        contactService.deleteMessagesBatch(ids);
        return ResponseEntity.ok(Map.of("message", ids.size() + " messages deleted successfully"));
    }

    @PostMapping("/messages/clear-older-than")
    public ResponseEntity<Map<String, String>> deleteMessagesOlderThan(@RequestParam("days") int days) {
        contactService.deleteMessagesOlderThan(days);
        return ResponseEntity.ok(Map.of("message", "Messages older than " + days + " days deleted"));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(adminService.getRecentAuditLogs());
    }

    @DeleteMapping("/audit-logs/{id}")
    public ResponseEntity<Map<String, String>> deleteAuditLog(@PathVariable Long id) {
        adminService.deleteAuditLog(id);
        return ResponseEntity.ok(Map.of("message", "Audit log deleted successfully"));
    }

    @PostMapping("/audit-logs/batch-delete")
    public ResponseEntity<Map<String, String>> deleteAuditLogsBatch(@RequestBody List<Long> ids) {
        adminService.deleteAuditLogsBatch(ids);
        return ResponseEntity.ok(Map.of("message", ids.size() + " audit logs deleted successfully"));
    }

    @PostMapping("/audit-logs/clear-older-than")
    public ResponseEntity<Map<String, String>> deleteAuditLogsOlderThan(@RequestParam("days") int days) {
        adminService.deleteAuditLogsOlderThan(days);
        return ResponseEntity.ok(Map.of("message", "Audit logs older than " + days + " days deleted"));
    }

    @DeleteMapping("/audit-logs/clear-all")
    public ResponseEntity<Map<String, String>> clearAllAuditLogs() {
        adminService.clearAllAuditLogs();
        return ResponseEntity.ok(Map.of("message", "All audit logs cleared"));
    }

    // --- Visitor Analytics Endpoints ---
    @GetMapping("/analytics/summary")
    public ResponseEntity<Map<String, Object>> getAnalyticsSummary() {
        return ResponseEntity.ok(analyticsService.getAnalyticsSummary());
    }

    @GetMapping("/analytics/visitors")
    public ResponseEntity<List<com.pandeyjee.portfolio.entity.VisitorLog>> getAllVisitors() {
        return ResponseEntity.ok(analyticsService.getAllVisitors());
    }

    @DeleteMapping("/analytics/visitors/{id}")
    public ResponseEntity<Map<String, String>> deleteVisitor(@PathVariable Long id) {
        analyticsService.deleteVisitor(id);
        return ResponseEntity.ok(Map.of("message", "Visitor log deleted"));
    }

    @PostMapping("/analytics/visitors/batch-delete")
    public ResponseEntity<Map<String, String>> deleteVisitorsBatch(@RequestBody List<Long> ids) {
        analyticsService.deleteVisitorsBatch(ids);
        return ResponseEntity.ok(Map.of("message", ids.size() + " visitor logs deleted"));
    }

    @PostMapping("/analytics/visitors/clear-older-than")
    public ResponseEntity<Map<String, String>> deleteVisitorsOlderThan(@RequestParam("days") int days) {
        analyticsService.deleteVisitorsOlderThan(days);
        return ResponseEntity.ok(Map.of("message", "Visitor logs older than " + days + " days deleted"));
    }

    @DeleteMapping("/analytics/visitors/clear-all")
    public ResponseEntity<Map<String, String>> clearAllVisitors() {
        analyticsService.clearAllVisitors();
        return ResponseEntity.ok(Map.of("message", "All visitor logs cleared"));
    }

    @GetMapping("/settings")
    public ResponseEntity<Map<String, String>> getSettings() {
        return ResponseEntity.ok(adminService.getSettings());
    }

    @PutMapping("/settings")
    public ResponseEntity<Map<String, String>> updateSettings(
            @RequestBody Map<String, String> settings,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {
        return ResponseEntity.ok(adminService.updateSettings(settings, userDetails.getUsername(), getClientIp(request)));
    }
}
