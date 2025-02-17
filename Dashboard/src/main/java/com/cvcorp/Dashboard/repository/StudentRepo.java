package com.cvcorp.Dashboard.repository;

import com.cvcorp.Dashboard.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends JpaRepository<Student,Integer> {
    List<Student> findByStudentNameContaining(String studentName);
    List<Student> findByStudentBranchContaining(String studentBranch);
    List<Student> findByStudentCollegeContaining(String studentCollege);
    List<Student> findByBatchIdContaining(String batch);
}
