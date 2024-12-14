package com.ott.job_quest_backend.service;

import com.ott.job_quest_backend.model.Application;
import com.ott.job_quest_backend.model.ApplicationStatus;
import com.ott.job_quest_backend.repo.ApplicationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepo repo;

    public Application createApplication(Application application) {
        return repo.save(application);
    }

    public Application updateApplication(Application application) {
        return repo.save(application);
    }

    public List<Application> applicationsByUserId(int user) {
        return repo.findByUserId(user);
    }

    public List<Application> applicationsByStatus(ApplicationStatus status, int user) {
        return repo.findByUserIdAndStatus(user, status);
    }

    public void deleteApplication(int id) {
        repo.deleteById(id);
    }

}
