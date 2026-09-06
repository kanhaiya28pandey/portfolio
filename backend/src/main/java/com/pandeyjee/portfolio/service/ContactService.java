package com.pandeyjee.portfolio.service;

import com.pandeyjee.portfolio.dto.ContactRequest;
import com.pandeyjee.portfolio.entity.ContactMessage;
import com.pandeyjee.portfolio.entity.enums.MessageStatus;
import com.pandeyjee.portfolio.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository contactMessageRepository, EmailService emailService) {
        this.contactMessageRepository = contactMessageRepository;
        this.emailService = emailService;
    }

    @Transactional
    public boolean submitContact(ContactRequest request, String ipAddress) {
        if (StringUtils.hasText(request.getWebsite())) {
            log.warn("Spam honeypot triggered by IP: {}. Silently dropping message.", ipAddress);
            return true;
        }

        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .inquiryType(request.getInquiryType())
                .ipAddress(ipAddress)
                .status(MessageStatus.NEW)
                .build();

        ContactMessage saved = contactMessageRepository.save(message);
        log.info("Saved new contact inquiry ID: {} from: {}", saved.getId(), saved.getEmail());

        emailService.sendContactNotification(saved);
        return true;
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getMessagesByStatus(MessageStatus status) {
        return contactMessageRepository.findAllByStatusOrderByCreatedAtDesc(status);
    }

    public long getUnreadCount() {
        return contactMessageRepository.countByStatus(MessageStatus.NEW);
    }

    @Transactional
    public ContactMessage updateMessageStatus(Long id, MessageStatus newStatus) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contact message not found with ID: " + id));
        message.setStatus(newStatus);
        return contactMessageRepository.save(message);
    }

    @Transactional
    public void deleteMessage(Long id) {
        contactMessageRepository.deleteById(id);
    }

    @Transactional
    public void deleteMessagesBatch(List<Long> ids) {
        contactMessageRepository.deleteAllById(ids);
    }

    @Transactional
    public void deleteMessagesOlderThan(int days) {
        java.time.LocalDateTime cutoff = java.time.LocalDateTime.now().minusDays(days);
        contactMessageRepository.deleteByCreatedAtBefore(cutoff);
    }
}
