package com.cvcorp.Dashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Student {
    @Id
    private String studentEmail;
    private String studentName;
    private String studentMobile;
    private String studentBranch;
    private float studentPercentage;
    private String batchId;
    private String studentCollege;
}
