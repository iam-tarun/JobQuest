package com.ott.job_quest_backend.controller;

import com.ott.job_quest_backend.model.Application;
import com.ott.job_quest_backend.model.ApplicationStatus;
import com.ott.job_quest_backend.service.ApplicationService;
import com.ott.job_quest_backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private FileService fileService;

    @PostMapping(value="/application", consumes="multipart/form-data")
    public Application createApplication(
            @RequestParam("roleName") String roleName,
            @RequestParam("companyName") String companyName,
            @RequestParam("tag") String tag,
            @RequestParam("remarks") String remarks,
            @RequestParam("jobDescription") String jobDescription,
            @RequestParam("platform") String platform,
            @RequestParam("status") ApplicationStatus status,
            @RequestParam("resume") MultipartFile resume,
            @RequestParam("dateOfApplication") String date

    ) throws IOException, ParseException {


        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date dateOfApplication = formatter.parse(date);
        Application application = new Application();
        application.setRoleName(roleName);
        application.setCompanyName(companyName);
        application.setTag(tag);
        application.setStatus(status);
        application.setDateOfApplication(dateOfApplication);
        application.setRemarks(remarks);
        application.setJobDescription(jobDescription);
        application.setPlatform(platform);
        String resumePath = fileService.saveFile(resume, companyName, roleName);
        application.setResume(resumePath);

        return applicationService.createApplication(application);
    }

    @PutMapping("/application")
    public Application updateApplication(@RequestBody Application application) {
        return applicationService.updateApplication(application);
    }

    @GetMapping("/application")
    public List<Application> fetchApplications() {
        return applicationService.allApplications();
    }

    @GetMapping("/application/stats")
    public Map<String, Integer> applicationStats() {
        return applicationService.applicationStats();
    }

    @DeleteMapping("/application/{id}")
    public void deleteApplication(@PathVariable Integer id) {
        applicationService.deleteApplication(id);
    }

}
