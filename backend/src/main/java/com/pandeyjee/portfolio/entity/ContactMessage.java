package com.pandeyjee.portfolio.entity;

import com.pandeyjee.portfolio.entity.enums.InquiryType;
import com.pandeyjee.portfolio.entity.enums.MessageStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "inquiry_type", nullable = false, length = 100)
    private InquiryType inquiryType = InquiryType.GENERAL;

    @Column(name = "ip_address", length = 100)
    private String ipAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private MessageStatus status = MessageStatus.NEW;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public ContactMessage() {}

    public ContactMessage(Long id, String name, String email, String subject, String message, InquiryType inquiryType, String ipAddress, MessageStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.inquiryType = inquiryType != null ? inquiryType : InquiryType.GENERAL;
        this.ipAddress = ipAddress;
        this.status = status != null ? status : MessageStatus.NEW;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private String subject;
        private String message;
        private InquiryType inquiryType = InquiryType.GENERAL;
        private String ipAddress;
        private MessageStatus status = MessageStatus.NEW;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder subject(String subject) { this.subject = subject; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder inquiryType(InquiryType inquiryType) { this.inquiryType = inquiryType; return this; }
        public Builder ipAddress(String ipAddress) { this.ipAddress = ipAddress; return this; }
        public Builder status(MessageStatus status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ContactMessage build() {
            return new ContactMessage(id, name, email, subject, message, inquiryType, ipAddress, status, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public InquiryType getInquiryType() { return inquiryType; }
    public void setInquiryType(InquiryType inquiryType) { this.inquiryType = inquiryType; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public MessageStatus getStatus() { return status; }
    public void setStatus(MessageStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
