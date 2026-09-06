package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.Skill;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByStatusOrderByDisplayOrderAsc(ContentStatus status);
    List<Skill> findAllByOrderByDisplayOrderAsc();
    List<Skill> findAllByStatusAndCategoryOrderByDisplayOrderAsc(ContentStatus status, String category);
    java.util.Optional<Skill> findByName(String name);
}
