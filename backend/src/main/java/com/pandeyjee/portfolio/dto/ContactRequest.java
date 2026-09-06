package com.pandeyjee.portfolio.dto;

import com.pandeyjee.portfolio.entity.enums.InquiryType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    @Size(max = 200, message = "Email must not exceed 200 characters")
    private String email;

    @NotBlank(message = "Subject is required")
    @Size(max = 255, message = "Subject must not exceed 255 characters")
    private String subject;

    @NotBlank(message = "Message cannot be empty")
    @Size(max = 5000, message = "Message is too long")
    private String message;

    private InquiryType inquiryType = InquiryType.GENERAL;

    private String website; // honeypot

    public ContactRequest() {}

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

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
}
