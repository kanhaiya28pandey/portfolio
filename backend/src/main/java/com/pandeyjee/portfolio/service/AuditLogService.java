package com.pandeyjee.portfolio.service;

import com.pandeyjee.portfolio.entity.AuditLog;
import com.pandeyjee.portfolio.repository.AuditLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService {

    private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Async
    public void logAction(String adminUsername, String action, String entityType, String entityId, String details, String ipAddress) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .adminUsername(adminUsername != null ? adminUsername : "SYSTEM")
                    .action(action)
                    .entityType(entityType)
                    .entityId(entityId)
                    .details(details)
                    .ipAddress(ipAddress)
                    .build();

            auditLogRepository.save(auditLog);
            log.info("Audit log recorded: {} by {} on {}:{}", action, adminUsername, entityType, entityId);
        } catch (Exception e) {
            log.error("Failed to record audit log: {}", e.getMessage());
        }
    }
}
