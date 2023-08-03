package com.yash.testpostgres.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.yash.testpostgres.model.Test;
import com.yash.testpostgres.repository.TestRepo;
import com.yash.testpostgres.service.TestService;

@Service
public class TestServiceImpl implements TestService {

	public TestServiceImpl() {
	
		
	}
	
	
	@Autowired
	private TestRepo testrepo;
	
	
	@Override
	public String addUser(Test test) {
		
       testrepo.save(test);
		return "save ";
	}

	@Override
	public List<Test> getAllUsers() {
		return testrepo.findAll();
		
	}

	@Override
	public Optional<Test> getUserById(Integer id) {
		return testrepo.findById(id);
		
	}

	@Override
	public String updateUser(Test test) {
		testrepo.save(test);
		return "User Updated";
	}

	@Override
	public String deleteUser(int id) {
		testrepo.deleteById(id);
		return "user deleted";
	}

}
