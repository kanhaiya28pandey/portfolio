package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.Certificate;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findAllByStatusOrderByDisplayOrderAsc(ContentStatus status);
    List<Certificate> findAllByOrderByDisplayOrderAsc();
    Optional<Certificate> findByTitle(String title);
}
