package com.pandeyjee.portfolio.dto;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class ProjectDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;

    @NotBlank(message = "Summary is required")
    private String summary;

    private String descriptionMarkdown;
    private String thumbnailUrl;
    private String bannerUrl;
    private String liveUrl;
    private String githubUrl;
    private String category;
    private boolean isFeatured;
    private int displayOrder;
    private ContentStatus status;
    private List<Long> skillIds;
    private List<SkillDto> skills;

    public ProjectDto() {}

    public ProjectDto(Long id, String title, String slug, String summary, String descriptionMarkdown, String thumbnailUrl, String bannerUrl, String liveUrl, String githubUrl, String category, boolean isFeatured, int displayOrder, ContentStatus status, List<Long> skillIds, List<SkillDto> skills) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.summary = summary;
        this.descriptionMarkdown = descriptionMarkdown;
        this.thumbnailUrl = thumbnailUrl;
        this.bannerUrl = bannerUrl;
        this.liveUrl = liveUrl;
        this.githubUrl = githubUrl;
        this.category = category;
        this.isFeatured = isFeatured;
        this.displayOrder = displayOrder;
        this.status = status;
        this.skillIds = skillIds;
        this.skills = skills;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String title;
        private String slug;
        private String summary;
        private String descriptionMarkdown;
        private String thumbnailUrl;
        private String bannerUrl;
        private String liveUrl;
        private String githubUrl;
        private String category;
        private boolean isFeatured;
        private int displayOrder;
        private ContentStatus status;
        private List<Long> skillIds;
        private List<SkillDto> skills;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder slug(String slug) { this.slug = slug; return this; }
        public Builder summary(String summary) { this.summary = summary; return this; }
        public Builder descriptionMarkdown(String descriptionMarkdown) { this.descriptionMarkdown = descriptionMarkdown; return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public Builder bannerUrl(String bannerUrl) { this.bannerUrl = bannerUrl; return this; }
        public Builder liveUrl(String liveUrl) { this.liveUrl = liveUrl; return this; }
        public Builder githubUrl(String githubUrl) { this.githubUrl = githubUrl; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder isFeatured(boolean isFeatured) { this.isFeatured = isFeatured; return this; }
        public Builder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder status(ContentStatus status) { this.status = status; return this; }
        public Builder skillIds(List<Long> skillIds) { this.skillIds = skillIds; return this; }
        public Builder skills(List<SkillDto> skills) { this.skills = skills; return this; }

        public ProjectDto build() {
            return new ProjectDto(id, title, slug, summary, descriptionMarkdown, thumbnailUrl, bannerUrl, liveUrl, githubUrl, category, isFeatured, displayOrder, status, skillIds, skills);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getDescriptionMarkdown() { return descriptionMarkdown; }
    public void setDescriptionMarkdown(String descriptionMarkdown) { this.descriptionMarkdown = descriptionMarkdown; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getBannerUrl() { return bannerUrl; }
    public void setBannerUrl(String bannerUrl) { this.bannerUrl = bannerUrl; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }

    public List<Long> getSkillIds() { return skillIds; }
    public void setSkillIds(List<Long> skillIds) { this.skillIds = skillIds; }

    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }
}
