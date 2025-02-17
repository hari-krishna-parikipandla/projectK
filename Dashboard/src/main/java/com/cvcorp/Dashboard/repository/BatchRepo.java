package com.cvcorp.Dashboard.repository;

import com.cvcorp.Dashboard.model.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepo extends JpaRepository<Batch, String> {

}
