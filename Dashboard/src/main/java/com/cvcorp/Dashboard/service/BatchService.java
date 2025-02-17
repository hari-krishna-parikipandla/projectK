package com.cvcorp.Dashboard.service;

import com.cvcorp.Dashboard.model.Batch;
import com.cvcorp.Dashboard.repository.BatchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BatchService {
    @Autowired
    private BatchRepo repo;
    public List<Batch> viewAllBatches() {
        return repo.findAll();
    }
    public Batch addBatch(Batch batch) {
        repo.save(batch);
        return batch;
    }
}
