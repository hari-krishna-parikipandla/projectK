package com.cvcorp.Dashboard.service;

import com.cvcorp.Dashboard.model.Student;
import com.cvcorp.Dashboard.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepo repo;
    public void addStudent(Student student){
        repo.save(student);
    }
    public List<Student> viewAllStudents() {
       return repo.findAll();
    }
    public Student findStudentById(int studentId) {
       return repo.findById(studentId).orElse(new Student());
    }
    public List<Student> findByStudentName(String name){
        return repo.findByStudentNameContaining(name);
    }
    public Student updateStudent(Student student) {
        return repo.save(student);
    }
    public void deleteStudent(int studentId) {
        repo.deleteById(studentId);
    }
    public List<Student> findByStudentBranch(String branch) {
        return repo.findByStudentBranchContaining(branch);
    }
    public List<Student> findByStudentCollege(String college) {
        return repo.findByStudentCollegeContaining(college);
    }
    public List<Student> findByBatchId(String batch) {
        return repo.findByBatchIdContaining(batch);
    }
}
