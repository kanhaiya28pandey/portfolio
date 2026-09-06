package com.pandeyjee.portfolio.dto;

import com.pandeyjee.portfolio.entity.Profile;
import java.util.List;
import java.util.Map;

public class PortfolioOverviewDto {
    private Profile profile;
    private List<SkillDto> skills;
    private List<ProjectDto> projects;
    private List<ExperienceDto> experiences;
    private List<EducationDto> educations;
    private List<CertificateDto> certificates;
    private List<AchievementDto> achievements;
    private Map<String, String> settings;

    public PortfolioOverviewDto() {}

    public PortfolioOverviewDto(Profile profile, List<SkillDto> skills, List<ProjectDto> projects, List<ExperienceDto> experiences, List<EducationDto> educations, List<CertificateDto> certificates, List<AchievementDto> achievements, Map<String, String> settings) {
        this.profile = profile;
        this.skills = skills;
        this.projects = projects;
        this.experiences = experiences;
        this.educations = educations;
        this.certificates = certificates;
        this.achievements = achievements;
        this.settings = settings;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Profile profile;
        private List<SkillDto> skills;
        private List<ProjectDto> projects;
        private List<ExperienceDto> experiences;
        private List<EducationDto> educations;
        private List<CertificateDto> certificates;
        private List<AchievementDto> achievements;
        private Map<String, String> settings;

        public Builder profile(Profile profile) { this.profile = profile; return this; }
        public Builder skills(List<SkillDto> skills) { this.skills = skills; return this; }
        public Builder projects(List<ProjectDto> projects) { this.projects = projects; return this; }
        public Builder experiences(List<ExperienceDto> experiences) { this.experiences = experiences; return this; }
        public Builder educations(List<EducationDto> educations) { this.educations = educations; return this; }
        public Builder certificates(List<CertificateDto> certificates) { this.certificates = certificates; return this; }
        public Builder achievements(List<AchievementDto> achievements) { this.achievements = achievements; return this; }
        public Builder settings(Map<String, String> settings) { this.settings = settings; return this; }

        public PortfolioOverviewDto build() {
            return new PortfolioOverviewDto(profile, skills, projects, experiences, educations, certificates, achievements, settings);
        }
    }

    public Profile getProfile() { return profile; }
    public void setProfile(Profile profile) { this.profile = profile; }

    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }

    public List<ProjectDto> getProjects() { return projects; }
    public void setProjects(List<ProjectDto> projects) { this.projects = projects; }

    public List<ExperienceDto> getExperiences() { return experiences; }
    public void setExperiences(List<ExperienceDto> experiences) { this.experiences = experiences; }

    public List<EducationDto> getEducations() { return educations; }
    public void setEducations(List<EducationDto> educations) { this.educations = educations; }

    public List<CertificateDto> getCertificates() { return certificates; }
    public void setCertificates(List<CertificateDto> certificates) { this.certificates = certificates; }

    public List<AchievementDto> getAchievements() { return achievements; }
    public void setAchievements(List<AchievementDto> achievements) { this.achievements = achievements; }

    public Map<String, String> getSettings() { return settings; }
    public void setSettings(Map<String, String> settings) { this.settings = settings; }
}
