package com.ott.job_quest_backend.controller;

import com.ott.job_quest_backend.model.User;
import com.ott.job_quest_backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    @GetMapping("/auth/status")
    public ResponseEntity<?> checkAuthStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAuthenticated = authentication != null && authentication.isAuthenticated() &&
                !"anonymousUser".equals(authentication.getPrincipal());

        return ResponseEntity.ok(new AuthStatusResponse(isAuthenticated, isAuthenticated ? "Authenticated" : "Not authenticated"));
    }

    // DTO for structured response
    public static class AuthStatusResponse {
        private boolean authenticated;
        private String message;

        public AuthStatusResponse(boolean authenticated, String message) {
            this.authenticated = authenticated;
            this.message = message;
        }

        public boolean isAuthenticated() {
            return authenticated;
        }

        public String getMessage() {
            return message;
        }
    }

}
