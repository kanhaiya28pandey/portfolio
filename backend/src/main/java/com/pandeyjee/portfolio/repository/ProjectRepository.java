package com.pandeyjee.portfolio.repository;

import com.pandeyjee.portfolio.entity.Project;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    @EntityGraph(attributePaths = {"skills"})
    List<Project> findAllByStatusOrderByDisplayOrderAsc(ContentStatus status);

    @EntityGraph(attributePaths = {"skills"})
    List<Project> findAllByOrderByDisplayOrderAsc();

    @EntityGraph(attributePaths = {"skills"})
    List<Project> findAllByStatusAndIsFeaturedTrueOrderByDisplayOrderAsc(ContentStatus status);

    @EntityGraph(attributePaths = {"skills"})
    Optional<Project> findBySlugAndStatus(String slug, ContentStatus status);

    @EntityGraph(attributePaths = {"skills"})
    Optional<Project> findBySlug(String slug);
}
