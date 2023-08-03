package com.yash.testpostgres.service;

import java.util.List;
import java.util.Optional;
import com.yash.testpostgres.model.Test;


public interface TestService {

	
	 
	    
	   List<Test>getAllUsers();
	   Optional<Test> getUserById(Integer id);
       String addUser(Test test);
       String updateUser(Test test);
       String deleteUser(int id);
	     
	  

		
}

