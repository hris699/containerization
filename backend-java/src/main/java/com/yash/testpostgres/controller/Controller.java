package com.yash.testpostgres.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yash.testpostgres.model.Test;
import com.yash.testpostgres.service.TestService;

@RestController
@CrossOrigin(origins ="*")
public class Controller {

	@Autowired
	private TestService testservice;
	
	@GetMapping("/display")
	public String display()
	{
		return "Hardik";
	}
	
	
	@PostMapping("/add")
	public void addTest(@RequestBody Test test)
	{
		testservice.addUser(test);
		
	}
	
	@GetMapping("/users")
	public List<Test> getAllUsers(){
		
		return testservice.getAllUsers();
	}
	@DeleteMapping("/user")
	public String deleteUser(@RequestParam("id") int id ){
		return testservice.deleteUser(id);
	}
	
	@PutMapping("/user_update")
	public String updateUser(@RequestBody Test test) {
		return testservice.updateUser(test);
	}
	
	@GetMapping("/user/{userId}")
	public Optional<Test> getUserById(@PathVariable Integer userId)
	{
		return testservice.getUserById(userId);
		
	}
	

	
	
}
