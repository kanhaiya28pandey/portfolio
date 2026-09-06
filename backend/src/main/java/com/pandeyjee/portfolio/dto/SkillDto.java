package com.pandeyjee.portfolio.dto;

import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;

public class SkillDto {
    private Long id;

    @NotBlank(message = "Skill name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    private String proficiencyLevel;
    private String description;
    private String iconKey;
    private int displayOrder;
    private ContentStatus status;

    public SkillDto() {}

    public SkillDto(Long id, String name, String category, String proficiencyLevel, String description, String iconKey, int displayOrder, ContentStatus status) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
        this.description = description;
        this.iconKey = iconKey;
        this.displayOrder = displayOrder;
        this.status = status;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private String category;
        private String proficiencyLevel;
        private String description;
        private String iconKey;
        private int displayOrder;
        private ContentStatus status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder proficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder iconKey(String iconKey) { this.iconKey = iconKey; return this; }
        public Builder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder status(ContentStatus status) { this.status = status; return this; }

        public SkillDto build() {
            return new SkillDto(id, name, category, proficiencyLevel, description, iconKey, displayOrder, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIconKey() { return iconKey; }
    public void setIconKey(String iconKey) { this.iconKey = iconKey; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
}
