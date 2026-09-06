package com.pandeyjee.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;

public class ExperienceDto {
    private Long id;

    @NotBlank(message = "Organization is required")
    private String organization;

    @NotBlank(message = "Role is required")
    private String role;

    private String location;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotBlank(message = "Description is required")
    private String descriptionMarkdown;

    @JsonProperty("isCurrent")
    @JsonAlias({"isCurrent", "current"})
    private boolean isCurrent;
    private int displayOrder;
    private ContentStatus status;
    private String employmentType;
    private String assignedProjectName;
    private String assignedProjectSlug;
    private String technologies;
    private String certificatesJson;

    public ExperienceDto() {}

    public ExperienceDto(Long id, String organization, String role, String location, String duration, String descriptionMarkdown, boolean isCurrent, int displayOrder, ContentStatus status, String employmentType, String assignedProjectName, String assignedProjectSlug, String technologies, String certificatesJson) {
        this.id = id;
        this.organization = organization;
        this.role = role;
        this.location = location;
        this.duration = duration;
        this.descriptionMarkdown = descriptionMarkdown;
        this.isCurrent = isCurrent;
        this.displayOrder = displayOrder;
        this.status = status;
        this.employmentType = employmentType;
        this.assignedProjectName = assignedProjectName;
        this.assignedProjectSlug = assignedProjectSlug;
        this.technologies = technologies;
        this.certificatesJson = certificatesJson;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String organization;
        private String role;
        private String location;
        private String duration;
        private String descriptionMarkdown;
        private boolean isCurrent;
        private int displayOrder;
        private ContentStatus status;
        private String employmentType;
        private String assignedProjectName;
        private String assignedProjectSlug;
        private String technologies;
        private String certificatesJson;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder organization(String organization) { this.organization = organization; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder duration(String duration) { this.duration = duration; return this; }
        public Builder descriptionMarkdown(String descriptionMarkdown) { this.descriptionMarkdown = descriptionMarkdown; return this; }
        public Builder isCurrent(boolean isCurrent) { this.isCurrent = isCurrent; return this; }
        public Builder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder status(ContentStatus status) { this.status = status; return this; }
        public Builder employmentType(String employmentType) { this.employmentType = employmentType; return this; }
        public Builder assignedProjectName(String assignedProjectName) { this.assignedProjectName = assignedProjectName; return this; }
        public Builder assignedProjectSlug(String assignedProjectSlug) { this.assignedProjectSlug = assignedProjectSlug; return this; }
        public Builder technologies(String technologies) { this.technologies = technologies; return this; }
        public Builder certificatesJson(String certificatesJson) { this.certificatesJson = certificatesJson; return this; }

        public ExperienceDto build() {
            return new ExperienceDto(id, organization, role, location, duration, descriptionMarkdown, isCurrent, displayOrder, status, employmentType, assignedProjectName, assignedProjectSlug, technologies, certificatesJson);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getDescriptionMarkdown() { return descriptionMarkdown; }
    public void setDescriptionMarkdown(String descriptionMarkdown) { this.descriptionMarkdown = descriptionMarkdown; }

    @JsonProperty("isCurrent")
    public boolean isCurrent() { return isCurrent; }

    @JsonProperty("isCurrent")
    public void setCurrent(boolean current) { isCurrent = current; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }

    public String getEmploymentType() { return employmentType; }
    public void setEmploymentType(String employmentType) { this.employmentType = employmentType; }

    public String getAssignedProjectName() { return assignedProjectName; }
    public void setAssignedProjectName(String assignedProjectName) { this.assignedProjectName = assignedProjectName; }

    public String getAssignedProjectSlug() { return assignedProjectSlug; }
    public void setAssignedProjectSlug(String assignedProjectSlug) { this.assignedProjectSlug = assignedProjectSlug; }

    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }

    public String getCertificatesJson() { return certificatesJson; }
    public void setCertificatesJson(String certificatesJson) { this.certificatesJson = certificatesJson; }
}
