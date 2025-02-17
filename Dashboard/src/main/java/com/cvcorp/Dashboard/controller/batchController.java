package com.cvcorp.Dashboard.controller;


import com.cvcorp.Dashboard.model.Batch;
import com.cvcorp.Dashboard.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class batchController {

    @Autowired
    private BatchService service;

    @GetMapping("viewBatches")
    public List<Batch> viewAllBatches(){
        return service.viewAllBatches();
    }
    @PostMapping("/addBatch")
    public ResponseEntity<Batch> addBatch(@RequestBody Batch batch) {
        if (batch.getBatchId() == null || batch.getBatchId().isEmpty())
            return new ResponseEntity<Batch>(batch, HttpStatus.BAD_REQUEST);
        Batch savedBatch = service.addBatch(batch);
        return new ResponseEntity<>(savedBatch, HttpStatus.CREATED);
    }
}
