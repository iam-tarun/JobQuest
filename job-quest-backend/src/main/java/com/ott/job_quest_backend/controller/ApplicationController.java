package com.ott.job_quest_backend.controller;

import com.ott.job_quest_backend.model.Application;
import com.ott.job_quest_backend.model.ApplicationStatus;
import com.ott.job_quest_backend.service.ApplicationService;
import com.ott.job_quest_backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
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
            @RequestParam("dateOfApplication") String date,
            @RequestParam("link") String link,
            @RequestParam("creds") String creds
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
        application.setLink(link);
        application.setCreds(creds);

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

    @GetMapping("/application/resume/{id}")
    public ResponseEntity<Resource> downloadResume(@PathVariable Integer id) {
        try {
            // Retrieve file from service
            File resume = applicationService.getResume(id);

            // Validate file
            if (resume == null || !resume.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Load file as Resource
            Path path = Paths.get(resume.getAbsolutePath());
            Resource resource = new UrlResource(path.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

            // Set Content-Disposition header for download
            String contentDisposition = "attachment; filename=\"" + resume.getName() + "\"";

            // Determine Content-Type based on file type (default to octet-stream)
            String contentType = "application/octet-stream"; // Default
            if (resume.getName().endsWith(".pdf")) {
                contentType = "application/pdf";
            } else if (resume.getName().endsWith(".doc") || resume.getName().endsWith(".docx")) {
                contentType = "application/msword";
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(resource);

        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((Resource) e);
        }
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
