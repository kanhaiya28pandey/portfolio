package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.VisitorLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitorLogRepository extends JpaRepository<VisitorLog, Long> {
    List<VisitorLog> findAllByOrderByVisitedAtDesc();
    List<VisitorLog> findTop100ByOrderByVisitedAtDesc();
    long countByVisitedAtAfter(LocalDateTime date);

    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM VisitorLog v")
    long countDistinctIp();

    void deleteByVisitedAtBefore(LocalDateTime date);
}
