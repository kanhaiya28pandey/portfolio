package com.pandeyjee.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String bio;

    @Column(name = "about_markdown", nullable = false, columnDefinition = "TEXT")
    private String aboutMarkdown;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "portrait_3d_url", length = 500)
    private String portrait3dUrl;

    @Column(name = "resume_url", length = 500)
    private String resumeUrl;

    @Column(name = "availability_status", nullable = false, length = 100)
    private String availabilityStatus = "Open to Opportunities";

    @Column(length = 150)
    private String location;

    @Column(length = 200)
    private String email;

    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    @Column(name = "github_url", length = 500)
    private String githubUrl;

    @Column(name = "coffee_url", length = 500)
    private String coffeeUrl;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Profile() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAboutMarkdown() { return aboutMarkdown; }
    public void setAboutMarkdown(String aboutMarkdown) { this.aboutMarkdown = aboutMarkdown; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getPortrait3dUrl() { return portrait3dUrl; }
    public void setPortrait3dUrl(String portrait3dUrl) { this.portrait3dUrl = portrait3dUrl; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getCoffeeUrl() { return coffeeUrl; }
    public void setCoffeeUrl(String coffeeUrl) { this.coffeeUrl = coffeeUrl; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
