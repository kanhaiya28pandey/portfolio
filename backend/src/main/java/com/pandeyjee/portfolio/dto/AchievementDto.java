package com.pandeyjee.portfolio.dto;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;

public class AchievementDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Metric value is required")
    private String metricValue;

    private String description;
    private String iconKey;
    private String organization;
    private String issueDate;
    private String proofUrl;
    private int displayOrder;
    private ContentStatus status;

    public AchievementDto() {}

    public AchievementDto(Long id, String title, String metricValue, String description, String iconKey, String organization, String issueDate, String proofUrl, int displayOrder, ContentStatus status) {
        this.id = id;
        this.title = title;
        this.metricValue = metricValue;
        this.description = description;
        this.iconKey = iconKey;
        this.organization = organization;
        this.issueDate = issueDate;
        this.proofUrl = proofUrl;
        this.displayOrder = displayOrder;
        this.status = status;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String title;
        private String metricValue;
        private String description;
        private String iconKey;
        private String organization;
        private String issueDate;
        private String proofUrl;
        private int displayOrder;
        private ContentStatus status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder metricValue(String metricValue) { this.metricValue = metricValue; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder iconKey(String iconKey) { this.iconKey = iconKey; return this; }
        public Builder organization(String organization) { this.organization = organization; return this; }
        public Builder issueDate(String issueDate) { this.issueDate = issueDate; return this; }
        public Builder proofUrl(String proofUrl) { this.proofUrl = proofUrl; return this; }
        public Builder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder status(ContentStatus status) { this.status = status; return this; }

        public AchievementDto build() {
            return new AchievementDto(id, title, metricValue, description, iconKey, organization, issueDate, proofUrl, displayOrder, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMetricValue() { return metricValue; }
    public void setMetricValue(String metricValue) { this.metricValue = metricValue; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIconKey() { return iconKey; }
    public void setIconKey(String iconKey) { this.iconKey = iconKey; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }

    public String getProofUrl() { return proofUrl; }
    public void setProofUrl(String proofUrl) { this.proofUrl = proofUrl; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
}
