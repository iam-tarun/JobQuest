package com.ott.job_quest_backend.controller;

import com.ott.job_quest_backend.model.User;
import com.ott.job_quest_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        String token = service.verify(user);

            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("token", token);
            return responseBody;
            
    }


}
