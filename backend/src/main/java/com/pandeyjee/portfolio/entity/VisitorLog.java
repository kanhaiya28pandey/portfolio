package com.pandeyjee.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_logs", indexes = {
    @Index(name = "idx_visitor_logs_visited_at", columnList = "visited_at"),
    @Index(name = "idx_visitor_logs_ip", columnList = "ip_address")
})
public class VisitorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address", length = 100)
    private String ipAddress;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "device_type", nullable = false, length = 50)
    private String deviceType = "Desktop";

    @Column(nullable = false, length = 50)
    private String browser = "Other";

    @Column(name = "operating_system", nullable = false, length = 50)
    private String operatingSystem = "Other";

    @Column(length = 500)
    private String referrer;

    @Column(name = "page_path", nullable = false, length = 255)
    private String pagePath = "/";

    @Column(name = "visited_at", nullable = false, updatable = false)
    private LocalDateTime visitedAt = LocalDateTime.now();

    public VisitorLog() {}

    public VisitorLog(Long id, String ipAddress, String userAgent, String deviceType, String browser, String operatingSystem, String referrer, String pagePath, LocalDateTime visitedAt) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.deviceType = deviceType != null ? deviceType : "Desktop";
        this.browser = browser != null ? browser : "Other";
        this.operatingSystem = operatingSystem != null ? operatingSystem : "Other";
        this.referrer = referrer;
        this.pagePath = pagePath != null ? pagePath : "/";
        this.visitedAt = visitedAt != null ? visitedAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String ipAddress;
        private String userAgent;
        private String deviceType = "Desktop";
        private String browser = "Other";
        private String operatingSystem = "Other";
        private String referrer;
        private String pagePath = "/";
        private LocalDateTime visitedAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder ipAddress(String ipAddress) { this.ipAddress = ipAddress; return this; }
        public Builder userAgent(String userAgent) { this.userAgent = userAgent; return this; }
        public Builder deviceType(String deviceType) { this.deviceType = deviceType; return this; }
        public Builder browser(String browser) { this.browser = browser; return this; }
        public Builder operatingSystem(String operatingSystem) { this.operatingSystem = operatingSystem; return this; }
        public Builder referrer(String referrer) { this.referrer = referrer; return this; }
        public Builder pagePath(String pagePath) { this.pagePath = pagePath; return this; }
        public Builder visitedAt(LocalDateTime visitedAt) { this.visitedAt = visitedAt; return this; }

        public VisitorLog build() {
            return new VisitorLog(id, ipAddress, userAgent, deviceType, browser, operatingSystem, referrer, pagePath, visitedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
    public String getDeviceType() { return deviceType; }
    public void setDeviceType(String deviceType) { this.deviceType = deviceType; }
    public String getBrowser() { return browser; }
    public void setBrowser(String browser) { this.browser = browser; }
    public String getOperatingSystem() { return operatingSystem; }
    public void setOperatingSystem(String operatingSystem) { this.operatingSystem = operatingSystem; }
    public String getReferrer() { return referrer; }
    public void setReferrer(String referrer) { this.referrer = referrer; }
    public String getPagePath() { return pagePath; }
    public void setPagePath(String pagePath) { this.pagePath = pagePath; }
    public LocalDateTime getVisitedAt() { return visitedAt; }
    public void setVisitedAt(LocalDateTime visitedAt) { this.visitedAt = visitedAt; }
}
