package com.pandeyjee.portfolio.entity;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "achievements")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "metric_value", nullable = false, length = 100)
    private String metricValue;

    @Column(length = 500)
    private String description;

    @Column(name = "icon_key", length = 100)
    private String iconKey;

    @Column(length = 200)
    private String organization;

    @Column(name = "issue_date", length = 100)
    private String issueDate;

    @Column(name = "proof_url", length = 500)
    private String proofUrl;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ContentStatus status = ContentStatus.PUBLISHED;

    public Achievement() {}

    public Achievement(Long id, String title, String metricValue, String description, String iconKey, String organization, String issueDate, String proofUrl, int displayOrder, ContentStatus status) {
        this.id = id;
        this.title = title;
        this.metricValue = metricValue;
        this.description = description;
        this.iconKey = iconKey;
        this.organization = organization;
        this.issueDate = issueDate;
        this.proofUrl = proofUrl;
        this.displayOrder = displayOrder;
        this.status = status != null ? status : ContentStatus.PUBLISHED;
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
        private int displayOrder = 0;
        private ContentStatus status = ContentStatus.PUBLISHED;

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

        public Achievement build() {
            return new Achievement(id, title, metricValue, description, iconKey, organization, issueDate, proofUrl, displayOrder, status);
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
