package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.Education;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findAllByStatusOrderByDisplayOrderAsc(ContentStatus status);
    List<Education> findAllByOrderByDisplayOrderAsc();
}
