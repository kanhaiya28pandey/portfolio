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
@Transactional(readOnly = true)
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificateRepository certificateRepository;
    private final AchievementRepository achievementRepository;
    private final SiteSettingRepository siteSettingRepository;

    public PortfolioService(
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            CertificateRepository certificateRepository,
            AchievementRepository achievementRepository,
            SiteSettingRepository siteSettingRepository) {
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificateRepository = certificateRepository;
        this.achievementRepository = achievementRepository;
        this.siteSettingRepository = siteSettingRepository;
    }

    public PortfolioOverviewDto getOverview() {
        Profile profile = profileRepository.findAll().stream().findFirst().orElse(null);

        List<SkillDto> skills = getPublishedSkills();
        List<ProjectDto> projects = getPublishedProjects();
        List<ExperienceDto> experiences = getPublishedExperiences();
        List<EducationDto> educations = getPublishedEducations();
        List<CertificateDto> certificates = getPublishedCertificates();
        List<AchievementDto> achievements = getPublishedAchievements();
        Map<String, String> settings = getSettingsMap();

        return PortfolioOverviewDto.builder()
                .profile(profile)
                .skills(skills)
                .projects(projects)
                .experiences(experiences)
                .educations(educations)
                .certificates(certificates)
                .achievements(achievements)
                .settings(settings)
                .build();
    }

    public Profile getProfile() {
        return profileRepository.findAll().stream().findFirst().orElse(null);
    }

    public List<SkillDto> getPublishedSkills() {
        return skillRepository.findAllByStatusOrderByDisplayOrderAsc(ContentStatus.PUBLISHED)
                .stream()
                .map(this::mapSkillToDto)
                .collect(Collectors.toList());
    }

    public List<ProjectDto> getPublishedProjects() {
        return projectRepository.findAllByStatusOrderByDisplayOrderAsc(ContentStatus.PUBLISHED)
                .stream()
                .map(this::mapProjectToDto)
                .collect(Collectors.toList());
    }

    public Optional<ProjectDto> getProjectBySlug(String slug) {
        return projectRepository.findBySlugAndStatus(slug, ContentStatus.PUBLISHED)
                .map(this::mapProjectToDto);
    }

    public List<ExperienceDto> getPublishedExperiences() {
        return experienceRepository.findAllByStatusOrderByDisplayOrderAsc(ContentStatus.PUBLISHED)
                .stream()
                .map(this::mapExperienceToDto)
                .collect(Collectors.toList());
    }

    public List<EducationDto> getPublishedEducations() {
        return educationRepository.findAllByStatusOrderByDisplayOrderAsc(ContentStatus.PUBLISHED)
                .stream()
                .map(this::mapEducationToDto)
                .collect(Collectors.toList());
    }

    public List<CertificateDto> getPublishedCertificates() {
        return certificateRepository.findAllByStatusOrderByDisplayOrderAsc(ContentStatus.PUBLISHED)
                .stream()
                .map(this::mapCertificateToDto)
                .collect(Collectors.toList());
    }

    public List<AchievementDto> getPublishedAchievements() {
        return achievementRepository.findAllByStatusOrderByDisplayOrderAsc(ContentStatus.PUBLISHED)
                .stream()
                .map(this::mapAchievementToDto)
                .collect(Collectors.toList());
    }

    public Map<String, String> getSettingsMap() {
        return siteSettingRepository.findAll().stream()
                .collect(Collectors.toMap(SiteSetting::getSettingKey, SiteSetting::getSettingValue, (a, b) -> b));
    }

    public SkillDto mapSkillToDto(Skill skill) {
        return SkillDto.builder()
                .id(skill.getId())
                .name(skill.getName())
                .category(skill.getCategory())
                .proficiencyLevel(skill.getProficiencyLevel())
                .description(skill.getDescription())
                .iconKey(skill.getIconKey())
                .displayOrder(skill.getDisplayOrder())
                .status(skill.getStatus())
                .build();
    }

    public ProjectDto mapProjectToDto(Project project) {
        List<SkillDto> projectSkills = project.getSkills() != null
                ? project.getSkills().stream().map(this::mapSkillToDto).collect(Collectors.toList())
                : Collections.emptyList();

        List<Long> skillIds = projectSkills.stream().map(SkillDto::getId).collect(Collectors.toList());

        return ProjectDto.builder()
                .id(project.getId())
                .title(project.getTitle())
                .slug(project.getSlug())
                .summary(project.getSummary())
                .descriptionMarkdown(project.getDescriptionMarkdown())
                .thumbnailUrl(project.getThumbnailUrl())
                .bannerUrl(project.getBannerUrl())
                .liveUrl(project.getLiveUrl())
                .githubUrl(project.getGithubUrl())
                .category(project.getCategory())
                .isFeatured(project.isFeatured())
                .displayOrder(project.getDisplayOrder())
                .status(project.getStatus())
                .skillIds(skillIds)
                .skills(projectSkills)
                .build();
    }

    public ExperienceDto mapExperienceToDto(Experience exp) {
        return ExperienceDto.builder()
                .id(exp.getId())
                .organization(exp.getOrganization())
                .role(exp.getRole())
                .location(exp.getLocation())
                .duration(exp.getDuration())
                .descriptionMarkdown(exp.getDescriptionMarkdown())
                .isCurrent(exp.isCurrent())
                .displayOrder(exp.getDisplayOrder())
                .status(exp.getStatus())
                .employmentType(exp.getEmploymentType())
                .assignedProjectName(exp.getAssignedProjectName())
                .assignedProjectSlug(exp.getAssignedProjectSlug())
                .technologies(exp.getTechnologies())
                .certificatesJson(exp.getCertificatesJson())
                .build();
    }

    public EducationDto mapEducationToDto(Education edu) {
        return EducationDto.builder()
                .id(edu.getId())
                .institution(edu.getInstitution())
                .degree(edu.getDegree())
                .fieldOfStudy(edu.getFieldOfStudy())
                .duration(edu.getDuration())
                .gradeOrPercentage(edu.getGradeOrPercentage())
                .description(edu.getDescription())
                .displayOrder(edu.getDisplayOrder())
                .status(edu.getStatus())
                .certificatesJson(edu.getCertificatesJson())
                .build();
    }

    public CertificateDto mapCertificateToDto(Certificate cert) {
        return CertificateDto.builder()
                .id(cert.getId())
                .title(cert.getTitle())
                .issuingOrg(cert.getIssuingOrg())
                .issueDate(cert.getIssueDate())
                .credentialUrl(cert.getCredentialUrl())
                .thumbnailUrl(cert.getThumbnailUrl())
                .iconKey(cert.getIconKey())
                .displayOrder(cert.getDisplayOrder())
                .status(cert.getStatus())
                .build();
    }

    public AchievementDto mapAchievementToDto(Achievement ach) {
        return AchievementDto.builder()
                .id(ach.getId())
                .title(ach.getTitle())
                .metricValue(ach.getMetricValue())
                .description(ach.getDescription())
                .iconKey(ach.getIconKey())
                .organization(ach.getOrganization())
                .issueDate(ach.getIssueDate())
                .proofUrl(ach.getProofUrl())
                .displayOrder(ach.getDisplayOrder())
                .status(ach.getStatus())
                .build();
    }
}
