package com.pandeyjee.portfolio.entity;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "issuing_org", nullable = false, length = 200)
    private String issuingOrg;

    @Column(name = "issue_date", nullable = false, length = 100)
    private String issueDate;

    @Column(name = "credential_url", length = 500)
    private String credentialUrl;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "icon_key", length = 50)
    private String iconKey;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ContentStatus status = ContentStatus.PUBLISHED;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Certificate() {}

    public Certificate(Long id, String title, String issuingOrg, String issueDate, String credentialUrl, String thumbnailUrl, String iconKey, int displayOrder, ContentStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.issuingOrg = issuingOrg;
        this.issueDate = issueDate;
        this.credentialUrl = credentialUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.iconKey = iconKey;
        this.displayOrder = displayOrder;
        this.status = status != null ? status : ContentStatus.PUBLISHED;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String title;
        private String issuingOrg;
        private String issueDate;
        private String credentialUrl;
        private String thumbnailUrl;
        private String iconKey;
        private int displayOrder = 0;
        private ContentStatus status = ContentStatus.PUBLISHED;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder issuingOrg(String issuingOrg) { this.issuingOrg = issuingOrg; return this; }
        public Builder issueDate(String issueDate) { this.issueDate = issueDate; return this; }
        public Builder credentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public Builder iconKey(String iconKey) { this.iconKey = iconKey; return this; }
        public Builder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder status(ContentStatus status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Certificate build() {
            return new Certificate(id, title, issuingOrg, issueDate, credentialUrl, thumbnailUrl, iconKey, displayOrder, status, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIssuingOrg() { return issuingOrg; }
    public void setIssuingOrg(String issuingOrg) { this.issuingOrg = issuingOrg; }

    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }

    public String getCredentialUrl() { return credentialUrl; }
    public void setCredentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getIconKey() { return iconKey; }
    public void setIconKey(String iconKey) { this.iconKey = iconKey; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
