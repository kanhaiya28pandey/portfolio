package com.pandeyjee.portfolio.entity;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String organization;

    @Column(nullable = false, length = 150)
    private String role;

    @Column(length = 150)
    private String location;

    @Column(nullable = false, length = 100)
    private String duration;

    @Column(name = "description_markdown", nullable = false, columnDefinition = "TEXT")
    private String descriptionMarkdown;

    @Column(name = "is_current", nullable = false)
    private boolean isCurrent = false;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ContentStatus status = ContentStatus.PUBLISHED;

    @Column(name = "employment_type", length = 100)
    private String employmentType;

    @Column(name = "assigned_project_name", length = 200)
    private String assignedProjectName;

    @Column(name = "assigned_project_slug", length = 150)
    private String assignedProjectSlug;

    @Column(name = "technologies", length = 1000)
    private String technologies;

    @Column(name = "certificates_json", columnDefinition = "TEXT")
    private String certificatesJson;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Experience() {}

    public Experience(Long id, String organization, String role, String location, String duration, String descriptionMarkdown, boolean isCurrent, int displayOrder, ContentStatus status, String employmentType, String assignedProjectName, String assignedProjectSlug, String technologies, String certificatesJson, LocalDateTime createdAt) {
        this.id = id;
        this.organization = organization;
        this.role = role;
        this.location = location;
        this.duration = duration;
        this.descriptionMarkdown = descriptionMarkdown;
        this.isCurrent = isCurrent;
        this.displayOrder = displayOrder;
        this.status = status != null ? status : ContentStatus.PUBLISHED;
        this.employmentType = employmentType;
        this.assignedProjectName = assignedProjectName;
        this.assignedProjectSlug = assignedProjectSlug;
        this.technologies = technologies;
        this.certificatesJson = certificatesJson;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
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
        private boolean isCurrent = false;
        private int displayOrder = 0;
        private ContentStatus status = ContentStatus.PUBLISHED;
        private String employmentType;
        private String assignedProjectName;
        private String assignedProjectSlug;
        private String technologies;
        private String certificatesJson;
        private LocalDateTime createdAt = LocalDateTime.now();

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
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Experience build() {
            return new Experience(id, organization, role, location, duration, descriptionMarkdown, isCurrent, displayOrder, status, employmentType, assignedProjectName, assignedProjectSlug, technologies, certificatesJson, createdAt);
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

    public boolean isCurrent() { return isCurrent; }
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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
