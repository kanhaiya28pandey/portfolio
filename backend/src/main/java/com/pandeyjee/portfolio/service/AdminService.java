package com.pandeyjee.portfolio.service;

import com.pandeyjee.portfolio.dto.*;
import com.pandeyjee.portfolio.entity.*;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import com.pandeyjee.portfolio.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {

    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificateRepository certificateRepository;
    private final AchievementRepository achievementRepository;
    private final SiteSettingRepository siteSettingRepository;
    private final AuditLogRepository auditLogRepository;
    private final AuditLogService auditLogService;
    private final PortfolioService portfolioService;

    public AdminService(
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            CertificateRepository certificateRepository,
            AchievementRepository achievementRepository,
            SiteSettingRepository siteSettingRepository,
            AuditLogRepository auditLogRepository,
            AuditLogService auditLogService,
            PortfolioService portfolioService) {
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificateRepository = certificateRepository;
        this.achievementRepository = achievementRepository;
        this.siteSettingRepository = siteSettingRepository;
        this.auditLogRepository = auditLogRepository;
        this.auditLogService = auditLogService;
        this.portfolioService = portfolioService;
    }

    public Profile updateProfile(Profile updated, String adminUsername, String ip) {
        Profile profile = profileRepository.findAll().stream().findFirst()
                .orElse(new Profile());

        profile.setFullName(updated.getFullName());
        profile.setTitle(updated.getTitle());
        profile.setBio(updated.getBio());
        profile.setAboutMarkdown(updated.getAboutMarkdown());
        profile.setAvailabilityStatus(updated.getAvailabilityStatus());
        profile.setLocation(updated.getLocation());
        profile.setEmail(updated.getEmail());
        profile.setLinkedinUrl(updated.getLinkedinUrl());
        profile.setGithubUrl(updated.getGithubUrl());
        profile.setCoffeeUrl(updated.getCoffeeUrl());
        if (updated.getAvatarUrl() != null) profile.setAvatarUrl(updated.getAvatarUrl());
        if (updated.getPortrait3dUrl() != null) profile.setPortrait3dUrl(updated.getPortrait3dUrl());
        if (updated.getResumeUrl() != null) profile.setResumeUrl(updated.getResumeUrl());

        Profile saved = profileRepository.save(profile);
        auditLogService.logAction(adminUsername, "UPDATE_PROFILE", "PROFILE", String.valueOf(saved.getId()), "Updated profile info", ip);
        return saved;
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(portfolioService::mapProjectToDto)
                .collect(Collectors.toList());
    }

    public ProjectDto createProject(ProjectDto dto, String adminUsername, String ip) {
        String slug = dto.getSlug() != null && !dto.getSlug().isBlank()
                ? dto.getSlug()
                : dto.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");

        Set<Skill> skills = new HashSet<>();
        if (dto.getSkillIds() != null && !dto.getSkillIds().isEmpty()) {
            skills.addAll(skillRepository.findAllById(dto.getSkillIds()));
        }

        Project project = Project.builder()
                .title(dto.getTitle())
                .slug(slug)
                .summary(dto.getSummary())
                .descriptionMarkdown(dto.getDescriptionMarkdown())
                .thumbnailUrl(dto.getThumbnailUrl())
                .bannerUrl(dto.getBannerUrl())
                .liveUrl(dto.getLiveUrl())
                .githubUrl(dto.getGithubUrl())
                .category(dto.getCategory() != null ? dto.getCategory() : "FULLSTACK")
                .isFeatured(dto.isFeatured())
                .displayOrder(dto.getDisplayOrder())
                .status(dto.getStatus() != null ? dto.getStatus() : ContentStatus.PUBLISHED)
                .skills(skills)
                .build();

        Project saved = projectRepository.save(project);
        auditLogService.logAction(adminUsername, "CREATE_PROJECT", "PROJECT", String.valueOf(saved.getId()), "Created project: " + saved.getTitle(), ip);
        return portfolioService.mapProjectToDto(saved);
    }

    public ProjectDto updateProject(Long id, ProjectDto dto, String adminUsername, String ip) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + id));

        project.setTitle(dto.getTitle());
        if (dto.getSlug() != null) project.setSlug(dto.getSlug());
        project.setSummary(dto.getSummary());
        project.setDescriptionMarkdown(dto.getDescriptionMarkdown());
        if (dto.getThumbnailUrl() != null) project.setThumbnailUrl(dto.getThumbnailUrl());
        if (dto.getBannerUrl() != null) project.setBannerUrl(dto.getBannerUrl());
        project.setLiveUrl(dto.getLiveUrl());
        project.setGithubUrl(dto.getGithubUrl());
        if (dto.getCategory() != null) project.setCategory(dto.getCategory());
        project.setFeatured(dto.isFeatured());
        project.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getStatus() != null) project.setStatus(dto.getStatus());

        if (dto.getSkillIds() != null) {
            Set<Skill> skills = new HashSet<>(skillRepository.findAllById(dto.getSkillIds()));
            project.setSkills(skills);
        }

        Project saved = projectRepository.save(project);
        auditLogService.logAction(adminUsername, "UPDATE_PROJECT", "PROJECT", String.valueOf(saved.getId()), "Updated project: " + saved.getTitle(), ip);
        return portfolioService.mapProjectToDto(saved);
    }

    public void deleteProject(Long id, String adminUsername, String ip) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + id));
        projectRepository.delete(project);
        auditLogService.logAction(adminUsername, "DELETE_PROJECT", "PROJECT", String.valueOf(id), "Deleted project: " + project.getTitle(), ip);
    }

    public List<SkillDto> getAllSkills() {
        return skillRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(portfolioService::mapSkillToDto)
                .collect(Collectors.toList());
    }

    public SkillDto createSkill(SkillDto dto, String adminUsername, String ip) {
        Skill skill = Skill.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .proficiencyLevel(dto.getProficiencyLevel() != null ? dto.getProficiencyLevel() : "INTERMEDIATE")
                .description(dto.getDescription())
                .iconKey(dto.getIconKey())
                .displayOrder(dto.getDisplayOrder())
                .status(dto.getStatus() != null ? dto.getStatus() : ContentStatus.PUBLISHED)
                .build();

        Skill saved = skillRepository.save(skill);
        auditLogService.logAction(adminUsername, "CREATE_SKILL", "SKILL", String.valueOf(saved.getId()), "Created skill: " + saved.getName(), ip);
        return portfolioService.mapSkillToDto(saved);
    }

    public SkillDto updateSkill(Long id, SkillDto dto, String adminUsername, String ip) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Skill not found with ID: " + id));

        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());
        if (dto.getProficiencyLevel() != null) skill.setProficiencyLevel(dto.getProficiencyLevel());
        skill.setDescription(dto.getDescription());
        skill.setIconKey(dto.getIconKey());
        skill.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getStatus() != null) skill.setStatus(dto.getStatus());

        Skill saved = skillRepository.save(skill);
        auditLogService.logAction(adminUsername, "UPDATE_SKILL", "SKILL", String.valueOf(saved.getId()), "Updated skill: " + saved.getName(), ip);
        return portfolioService.mapSkillToDto(saved);
    }

    public void deleteSkill(Long id, String adminUsername, String ip) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Skill not found with ID: " + id));
        skillRepository.delete(skill);
        auditLogService.logAction(adminUsername, "DELETE_SKILL", "SKILL", String.valueOf(id), "Deleted skill: " + skill.getName(), ip);
    }

    public List<CertificateDto> getAllCertificates() {
        return certificateRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(portfolioService::mapCertificateToDto)
                .collect(Collectors.toList());
    }

    public CertificateDto createCertificate(CertificateDto dto, String adminUsername, String ip) {
        Certificate cert = Certificate.builder()
                .title(dto.getTitle())
                .issuingOrg(dto.getIssuingOrg())
                .issueDate(dto.getIssueDate())
                .credentialUrl(dto.getCredentialUrl())
                .thumbnailUrl(dto.getThumbnailUrl())
                .iconKey(dto.getIconKey())
                .displayOrder(dto.getDisplayOrder())
                .status(dto.getStatus() != null ? dto.getStatus() : ContentStatus.PUBLISHED)
                .build();
        Certificate saved = certificateRepository.save(cert);
        auditLogService.logAction(adminUsername, "CREATE_CERTIFICATE", "CERTIFICATE", String.valueOf(saved.getId()), saved.getTitle(), ip);
        return portfolioService.mapCertificateToDto(saved);
    }

    public CertificateDto updateCertificate(Long id, CertificateDto dto, String adminUsername, String ip) {
        Certificate cert = certificateRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Certificate not found with ID: " + id));
        cert.setTitle(dto.getTitle());
        cert.setIssuingOrg(dto.getIssuingOrg());
        cert.setIssueDate(dto.getIssueDate());
        cert.setCredentialUrl(dto.getCredentialUrl());
        if (dto.getThumbnailUrl() != null) cert.setThumbnailUrl(dto.getThumbnailUrl());
        if (dto.getIconKey() != null) cert.setIconKey(dto.getIconKey());
        cert.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getStatus() != null) cert.setStatus(dto.getStatus());

        Certificate saved = certificateRepository.save(cert);
        auditLogService.logAction(adminUsername, "UPDATE_CERTIFICATE", "CERTIFICATE", String.valueOf(saved.getId()), saved.getTitle(), ip);
        return portfolioService.mapCertificateToDto(saved);
    }

    public void deleteCertificate(Long id, String adminUsername, String ip) {
        certificateRepository.deleteById(id);
        auditLogService.logAction(adminUsername, "DELETE_CERTIFICATE", "CERTIFICATE", String.valueOf(id), "Deleted certificate", ip);
    }

    public List<AchievementDto> getAllAchievements() {
        return achievementRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(portfolioService::mapAchievementToDto)
                .collect(Collectors.toList());
    }

    public AchievementDto createAchievement(AchievementDto dto, String adminUsername, String ip) {
        Achievement ach = Achievement.builder()
                .title(dto.getTitle())
                .metricValue(dto.getMetricValue())
                .description(dto.getDescription())
                .iconKey(dto.getIconKey())
                .organization(dto.getOrganization())
                .issueDate(dto.getIssueDate())
                .proofUrl(dto.getProofUrl())
                .displayOrder(dto.getDisplayOrder())
                .status(dto.getStatus() != null ? dto.getStatus() : ContentStatus.PUBLISHED)
                .build();
        Achievement saved = achievementRepository.save(ach);
        auditLogService.logAction(adminUsername, "CREATE_ACHIEVEMENT", "ACHIEVEMENT", String.valueOf(saved.getId()), saved.getTitle(), ip);
        return portfolioService.mapAchievementToDto(saved);
    }

    public AchievementDto updateAchievement(Long id, AchievementDto dto, String adminUsername, String ip) {
        Achievement ach = achievementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Achievement not found with ID: " + id));
        ach.setTitle(dto.getTitle());
        ach.setMetricValue(dto.getMetricValue());
        ach.setDescription(dto.getDescription());
        ach.setIconKey(dto.getIconKey());
        ach.setOrganization(dto.getOrganization());
        ach.setIssueDate(dto.getIssueDate());
        ach.setProofUrl(dto.getProofUrl());
        ach.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getStatus() != null) ach.setStatus(dto.getStatus());

        Achievement saved = achievementRepository.save(ach);
        auditLogService.logAction(adminUsername, "UPDATE_ACHIEVEMENT", "ACHIEVEMENT", String.valueOf(saved.getId()), saved.getTitle(), ip);
        return portfolioService.mapAchievementToDto(saved);
    }

    public void deleteAchievement(Long id, String adminUsername, String ip) {
        achievementRepository.deleteById(id);
        auditLogService.logAction(adminUsername, "DELETE_ACHIEVEMENT", "ACHIEVEMENT", String.valueOf(id), "Deleted achievement", ip);
    }

    public List<ExperienceDto> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(portfolioService::mapExperienceToDto)
                .collect(Collectors.toList());
    }

    public ExperienceDto createExperience(ExperienceDto dto, String adminUsername, String ip) {
        Experience exp = Experience.builder()
                .organization(dto.getOrganization())
                .role(dto.getRole())
                .location(dto.getLocation())
                .duration(dto.getDuration())
                .descriptionMarkdown(dto.getDescriptionMarkdown())
                .isCurrent(dto.isCurrent())
                .displayOrder(dto.getDisplayOrder())
                .status(dto.getStatus() != null ? dto.getStatus() : ContentStatus.PUBLISHED)
                .employmentType(dto.getEmploymentType())
                .assignedProjectName(dto.getAssignedProjectName())
                .assignedProjectSlug(dto.getAssignedProjectSlug())
                .technologies(dto.getTechnologies())
                .certificatesJson(dto.getCertificatesJson())
                .build();
        Experience saved = experienceRepository.save(exp);
        auditLogService.logAction(adminUsername, "CREATE_EXPERIENCE", "EXPERIENCE", String.valueOf(saved.getId()), saved.getOrganization(), ip);
        return portfolioService.mapExperienceToDto(saved);
    }

    public ExperienceDto updateExperience(Long id, ExperienceDto dto, String adminUsername, String ip) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Experience not found with ID: " + id));
        exp.setOrganization(dto.getOrganization());
        exp.setRole(dto.getRole());
        exp.setLocation(dto.getLocation());
        exp.setDuration(dto.getDuration());
        exp.setDescriptionMarkdown(dto.getDescriptionMarkdown());
        exp.setCurrent(dto.isCurrent());
        exp.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getStatus() != null) exp.setStatus(dto.getStatus());
        exp.setEmploymentType(dto.getEmploymentType());
        exp.setAssignedProjectName(dto.getAssignedProjectName());
        exp.setAssignedProjectSlug(dto.getAssignedProjectSlug());
        exp.setTechnologies(dto.getTechnologies());
        exp.setCertificatesJson(dto.getCertificatesJson());

        Experience saved = experienceRepository.save(exp);
        auditLogService.logAction(adminUsername, "UPDATE_EXPERIENCE", "EXPERIENCE", String.valueOf(saved.getId()), saved.getOrganization(), ip);
        return portfolioService.mapExperienceToDto(saved);
    }

    public void deleteExperience(Long id, String adminUsername, String ip) {
        experienceRepository.deleteById(id);
        auditLogService.logAction(adminUsername, "DELETE_EXPERIENCE", "EXPERIENCE", String.valueOf(id), "Deleted experience", ip);
    }

    public List<EducationDto> getAllEducations() {
        return educationRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(portfolioService::mapEducationToDto)
                .collect(Collectors.toList());
    }

    public EducationDto createEducation(EducationDto dto, String adminUsername, String ip) {
        Education edu = Education.builder()
                .institution(dto.getInstitution())
                .degree(dto.getDegree())
                .fieldOfStudy(dto.getFieldOfStudy())
                .duration(dto.getDuration())
                .gradeOrPercentage(dto.getGradeOrPercentage())
                .description(dto.getDescription())
                .displayOrder(dto.getDisplayOrder())
                .status(dto.getStatus() != null ? dto.getStatus() : ContentStatus.PUBLISHED)
                .certificatesJson(dto.getCertificatesJson())
                .build();
        Education saved = educationRepository.save(edu);
        auditLogService.logAction(adminUsername, "CREATE_EDUCATION", "EDUCATION", String.valueOf(saved.getId()), saved.getInstitution(), ip);
        return portfolioService.mapEducationToDto(saved);
    }

    public EducationDto updateEducation(Long id, EducationDto dto, String adminUsername, String ip) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Education not found with ID: " + id));
        edu.setInstitution(dto.getInstitution());
        edu.setDegree(dto.getDegree());
        edu.setFieldOfStudy(dto.getFieldOfStudy());
        edu.setDuration(dto.getDuration());
        edu.setGradeOrPercentage(dto.getGradeOrPercentage());
        edu.setDescription(dto.getDescription());
        edu.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getStatus() != null) edu.setStatus(dto.getStatus());
        edu.setCertificatesJson(dto.getCertificatesJson());

        Education saved = educationRepository.save(edu);
        auditLogService.logAction(adminUsername, "UPDATE_EDUCATION", "EDUCATION", String.valueOf(saved.getId()), saved.getInstitution(), ip);
        return portfolioService.mapEducationToDto(saved);
    }

    public void deleteEducation(Long id, String adminUsername, String ip) {
        educationRepository.deleteById(id);
        auditLogService.logAction(adminUsername, "DELETE_EDUCATION", "EDUCATION", String.valueOf(id), "Deleted education", ip);
    }

    public List<AuditLog> getRecentAuditLogs() {
        return auditLogRepository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteAuditLog(Long id) {
        auditLogRepository.deleteById(id);
    }

    public void deleteAuditLogsBatch(List<Long> ids) {
        auditLogRepository.deleteAllById(ids);
    }

    public void deleteAuditLogsOlderThan(int days) {
        java.time.LocalDateTime cutoff = java.time.LocalDateTime.now().minusDays(days);
        auditLogRepository.deleteByCreatedAtBefore(cutoff);
    }

    public void clearAllAuditLogs() {
        auditLogRepository.deleteAll();
    }

    public Map<String, String> getSettings() {
        return portfolioService.getSettingsMap();
    }

    public Map<String, String> updateSettings(Map<String, String> settings, String adminUsername, String ip) {
        if (settings != null) {
            for (Map.Entry<String, String> entry : settings.entrySet()) {
                if (entry.getKey() != null) {
                    SiteSetting s = siteSettingRepository.findBySettingKey(entry.getKey())
                            .orElseGet(() -> new SiteSetting(null, entry.getKey(), entry.getValue() != null ? entry.getValue() : "", entry.getKey(), null));
                    s.setSettingValue(entry.getValue() != null ? entry.getValue() : "");
                    siteSettingRepository.save(s);
                }
            }
            auditLogService.logAction(adminUsername, "UPDATE_SETTINGS", "SETTINGS", "GLOBAL", "Updated site settings", ip);
        }
        return portfolioService.getSettingsMap();
    }
}
