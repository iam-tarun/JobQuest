package com.ott.job_quest_backend.service;

import com.ott.job_quest_backend.model.Application;
import com.ott.job_quest_backend.model.ApplicationStatus;
import com.ott.job_quest_backend.model.MyUserDetails;
import com.ott.job_quest_backend.model.User;
import com.ott.job_quest_backend.repo.ApplicationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepo repo;

    @Autowired
    private UserService userService;

    public Application createApplication(Application application) {
        if (application.getUser() == null) {
            int userId = userService.currentUserId();
            User user = new User();
            user.setId(userId);
            application.setUser(user);
        }
        return repo.save(application);
    }

    public Application updateApplication(Application application) {
        return repo.save(application);
    }

    public List<Application> allApplications() {
        int userId = userService.currentUserId();
        return repo.findByUserId(userId);
    }

    public List<Application> applicationsByStatus(ApplicationStatus status) {
        int userId = userService.currentUserId();
        return repo.findByUserIdAndStatus(userId, status);
    }

    public void deleteApplication(int id) {
        repo.deleteById(id);
    }

}
