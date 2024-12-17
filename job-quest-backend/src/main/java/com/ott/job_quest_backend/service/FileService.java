package com.ott.job_quest_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {

    public String saveFile(MultipartFile file, String companyName, String roleName) throws IOException {
        String uploadDir = "/Users/tarun/Documents/FileServer/JobQuest/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            boolean temp = directory.mkdirs();
        }

        String originalFileName = file.getOriginalFilename();
        String filePath = uploadDir + File.separator + System.currentTimeMillis() + "-" + companyName + "-" + roleName +"-" + originalFileName;

        File resume = new File(filePath);
        file.transferTo(resume);

        return resume.getAbsolutePath();
    }

    public File getFile(String path) {
        File file = new File(path);
        if (!file.exists()) {
            return null;
        }
        else return file;
    }

}
