package com.pandeyjee.portfolio.entity;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "educations")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String institution;

    @Column(nullable = false, length = 150)
    private String degree;

    @Column(name = "field_of_study", nullable = false, length = 150)
    private String fieldOfStudy;

    @Column(nullable = false, length = 100)
    private String duration;

    @Column(name = "grade_or_percentage", length = 50)
    private String gradeOrPercentage;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ContentStatus status = ContentStatus.PUBLISHED;

    @Column(name = "certificates_json", columnDefinition = "TEXT")
    private String certificatesJson;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Education() {}

    public Education(Long id, String institution, String degree, String fieldOfStudy, String duration, String gradeOrPercentage, String description, int displayOrder, ContentStatus status, String certificatesJson, LocalDateTime createdAt) {
        this.id = id;
        this.institution = institution;
        this.degree = degree;
        this.fieldOfStudy = fieldOfStudy;
        this.duration = duration;
        this.gradeOrPercentage = gradeOrPercentage;
        this.description = description;
        this.displayOrder = displayOrder;
        this.status = status != null ? status : ContentStatus.PUBLISHED;
        this.certificatesJson = certificatesJson;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String institution;
        private String degree;
        private String fieldOfStudy;
        private String duration;
        private String gradeOrPercentage;
        private String description;
        private int displayOrder = 0;
        private ContentStatus status = ContentStatus.PUBLISHED;
        private String certificatesJson;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder institution(String institution) { this.institution = institution; return this; }
        public Builder degree(String degree) { this.degree = degree; return this; }
        public Builder fieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; return this; }
        public Builder duration(String duration) { this.duration = duration; return this; }
        public Builder gradeOrPercentage(String gradeOrPercentage) { this.gradeOrPercentage = gradeOrPercentage; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder status(ContentStatus status) { this.status = status; return this; }
        public Builder certificatesJson(String certificatesJson) { this.certificatesJson = certificatesJson; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Education build() {
            return new Education(id, institution, degree, fieldOfStudy, duration, gradeOrPercentage, description, displayOrder, status, certificatesJson, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getFieldOfStudy() { return fieldOfStudy; }
    public void setFieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getGradeOrPercentage() { return gradeOrPercentage; }
    public void setGradeOrPercentage(String gradeOrPercentage) { this.gradeOrPercentage = gradeOrPercentage; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }

    public String getCertificatesJson() { return certificatesJson; }
    public void setCertificatesJson(String certificatesJson) { this.certificatesJson = certificatesJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
