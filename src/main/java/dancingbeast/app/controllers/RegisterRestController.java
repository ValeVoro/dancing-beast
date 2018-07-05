package dancingbeast.app.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dancingbeast.app.repos.UsersRepo;


@RestController
public class RegisterRestController {
	
	@Autowired
	private UsersRepo usersRepo;

	  
	  @RequestMapping(value="/setName")
		 public boolean registration(@RequestParam("name") String name){
		  	boolean nameIsFree = usersRepo.checkNameAvailability(name);
		  	return nameIsFree;
		 }
	  
	

	  
	
}




