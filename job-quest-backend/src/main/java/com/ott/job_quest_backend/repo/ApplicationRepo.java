package com.ott.job_quest_backend.repo;

import com.ott.job_quest_backend.model.Application;
import com.ott.job_quest_backend.model.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepo extends JpaRepository<Application, Integer> {
    Page<Application> findByUserId(int user, Pageable pageable);

    List<Application> findByUser(int user);

    List<Application> findByUserIdAndStatus(int user, ApplicationStatus status);
}
