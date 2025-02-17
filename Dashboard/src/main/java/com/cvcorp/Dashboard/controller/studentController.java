package com.cvcorp.Dashboard.controller;


import com.cvcorp.Dashboard.model.Student;
import com.cvcorp.Dashboard.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class studentController {

    @Autowired
    private StudentService service;

    @GetMapping("viewStudents")
    public List<Student> viewAllStudents(){
       return service.viewAllStudents();
    }
    @GetMapping("searchStudents/{studentId}")
    public Student viewStudentById(@PathVariable int studentId){
        return service.findStudentById(studentId);
    }
    @GetMapping("searchStudents/studentName/{name}")
    public List<Student> searchStudentByName(@PathVariable String name){
        return service.findByStudentName(name);
    }
    @GetMapping("searchStudents/studentBranch/{branch}")
    public List<Student> searchStudentByBranch(@PathVariable String branch){
        return service.findByStudentBranch(branch);
    }
    @GetMapping("searchStudents/studentCollege/{college}")
    public List<Student> searchStudentByCollege(@PathVariable String college) {
        return service.findByStudentCollege(college);
    }
    @GetMapping("searchStudents/batch/{batch}")
    public List<Student> searchByBatch(@PathVariable String batch){
        return service.findByBatchId(batch);
    }
    @PostMapping("student")
    public void addStudent(@RequestBody Student student){
        service.addStudent(student);
    }
    @PutMapping("student")
    public Student updateStudent(@RequestBody Student student){
        return service.updateStudent(student);
    }
    @DeleteMapping("student/{studentId}")
    public String deleteStudent(@PathVariable int studentId){
        service.deleteStudent(studentId);
        return "deleted";
    }
}
