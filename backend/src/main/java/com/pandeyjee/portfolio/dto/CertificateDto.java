package com.pandeyjee.portfolio.dto;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;

public class CertificateDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Issuing organization is required")
    private String issuingOrg;

    @NotBlank(message = "Issue date is required")
    private String issueDate;

    private String credentialUrl;
    private String thumbnailUrl;
    private String iconKey;
    private int displayOrder;
    private ContentStatus status;

    public CertificateDto() {}

    public CertificateDto(Long id, String title, String issuingOrg, String issueDate, String credentialUrl, String thumbnailUrl, String iconKey, int displayOrder, ContentStatus status) {
        this.id = id;
        this.title = title;
        this.issuingOrg = issuingOrg;
        this.issueDate = issueDate;
        this.credentialUrl = credentialUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.iconKey = iconKey;
        this.displayOrder = displayOrder;
        this.status = status;
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
        private int displayOrder;
        private ContentStatus status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder issuingOrg(String issuingOrg) { this.issuingOrg = issuingOrg; return this; }
        public Builder issueDate(String issueDate) { this.issueDate = issueDate; return this; }
        public Builder credentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public Builder iconKey(String iconKey) { this.iconKey = iconKey; return this; }
        public Builder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder status(ContentStatus status) { this.status = status; return this; }

        public CertificateDto build() {
            return new CertificateDto(id, title, issuingOrg, issueDate, credentialUrl, thumbnailUrl, iconKey, displayOrder, status);
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
}
