package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.Experience;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findAllByStatusOrderByDisplayOrderAsc(ContentStatus status);
    List<Experience> findAllByOrderByDisplayOrderAsc();
}
