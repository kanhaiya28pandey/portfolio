package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.ContactMessage;
import com.pandeyjee.portfolio.entity.enums.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
    List<ContactMessage> findAllByStatusOrderByCreatedAtDesc(MessageStatus status);
    long countByStatus(MessageStatus status);
    void deleteByCreatedAtBefore(java.time.LocalDateTime date);
}
