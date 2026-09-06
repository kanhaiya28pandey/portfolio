package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.Achievement;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findAllByStatusOrderByDisplayOrderAsc(ContentStatus status);
    List<Achievement> findAllByOrderByDisplayOrderAsc();
}
