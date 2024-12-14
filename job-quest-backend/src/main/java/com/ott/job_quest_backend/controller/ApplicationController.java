package com.ott.job_quest_backend.controller;

import com.ott.job_quest_backend.model.Application;
import com.ott.job_quest_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/application")
    public Application createApplication(@RequestBody Application application) {
        return applicationService.createApplication(application);
    }

    @PutMapping("/application")
    public Application updateApplication(@RequestBody Application application) {
        return applicationService.updateApplication(application);
    }

    @GetMapping("/application/{user}")
    public List<Application> findApplicationsByUserId(@PathVariable int user) {
        return applicationService.applicationsByUserId(user);
    }

    @DeleteMapping("/application/{id}")
    public void deleteApplication(@PathVariable Integer id) {
        applicationService.deleteApplication(id);
    }

}
