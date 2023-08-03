package com.yash.testpostgres.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yash.testpostgres.model.Test;

@Repository
public interface TestRepo extends JpaRepository<Test,Integer> {

}
