package com.ott.job_quest_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Application {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    private String roleName;
    private String companyName;

    @Temporal(TemporalType.DATE)
    private Date dateOfApplication;

    private String platform;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @Lob
    private byte[] resume;

    private String jobDescription;
    private String remarks;
    private String tag;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

}
