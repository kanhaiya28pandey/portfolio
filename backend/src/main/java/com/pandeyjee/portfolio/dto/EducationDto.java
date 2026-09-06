package com.pandeyjee.portfolio.dto;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;

public class EducationDto {
    private Long id;

    @NotBlank(message = "Institution is required")
    private String institution;

    @NotBlank(message = "Degree is required")
    private String degree;

    @NotBlank(message = "Field of study is required")
    private String fieldOfStudy;

    @NotBlank(message = "Duration is required")
    private String duration;

    private String gradeOrPercentage;
    private String description;
    private int displayOrder;
    private ContentStatus status;
    private String certificatesJson;

    public EducationDto() {}

    public EducationDto(Long id, String institution, String degree, String fieldOfStudy, String duration, String gradeOrPercentage, String description, int displayOrder, ContentStatus status, String certificatesJson) {
        this.id = id;
        this.institution = institution;
        this.degree = degree;
        this.fieldOfStudy = fieldOfStudy;
        this.duration = duration;
        this.gradeOrPercentage = gradeOrPercentage;
        this.description = description;
        this.displayOrder = displayOrder;
        this.status = status;
        this.certificatesJson = certificatesJson;
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
        private int displayOrder;
        private ContentStatus status;
        private String certificatesJson;

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

        public EducationDto build() {
            return new EducationDto(id, institution, degree, fieldOfStudy, duration, gradeOrPercentage, description, displayOrder, status, certificatesJson);
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
}
