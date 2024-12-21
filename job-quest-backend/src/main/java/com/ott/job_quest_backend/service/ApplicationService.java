package com.ott.job_quest_backend.service;

import com.ott.job_quest_backend.model.Application;
import com.ott.job_quest_backend.model.ApplicationStatus;
import com.ott.job_quest_backend.model.MyUserDetails;
import com.ott.job_quest_backend.model.User;
import com.ott.job_quest_backend.repo.ApplicationRepo;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        int userId = userService.currentUserId();
        User user = new User();
        user.setId(userId);
        application.setUser(user);
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

    public Map<String, Integer> applicationStats() {
        int userId = userService.currentUserId();
        Map<String, Integer> result = new HashMap<>();
        result.put("total", repo.findByUserId(userId).size());
        result.put("rejected", repo.findByUserIdAndStatus(userId, ApplicationStatus.REJECTED).size());
        return result;
    }

    public void deleteApplication(int id) {
        repo.deleteById(id);
    }

    public File getResume(int id) throws IllegalArgumentException{
        Optional<Application> application = this.repo.findById(id);

        // Check if the application is present
        if (application.isPresent()) {
            String resumePath = application.get().getResume(); // Assuming `getResume` returns a file path
            File file = new File(resumePath);

            // Validate if the file exists
            if (file.exists()) {
                return file; // Return the file if it exists
            } else {
                throw new IllegalArgumentException("Resume file does not exist at the specified path.");
            }
        } else {
            throw new IllegalArgumentException("Application not found with ID: " + id);
        }

    }
}
