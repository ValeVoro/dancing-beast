package dancingbeast.app.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dancingbeast.app.entities.Score;
import dancingbeast.app.entities.User;
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
	  
	  @RequestMapping("/sendRegistration")
		 public String registerUser(@RequestBody User user, Model model, HttpServletRequest req, HttpServletResponse resp){
		  	try {
		  		String name = user.getName();
		  		String beast = user.getBeast() + "";
		  		String password = user.getPassword();
		  		
		  		usersRepo.addNewUser(beast, name, password);
		  		usersRepo.authWithHttpServletRequest(req, resp, name, password);	
		 		
		  		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		  		
		        
		         // Place the new Authentication object in the security context.
		         SecurityContextHolder.getContext().setAuthentication(auth);

		         //this step is import, otherwise the new login is not in session which is required by Spring Security
		         req.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
		     
		         
		         String currentPrincipalName = auth.getName();
			} catch(DataAccessException e) {
				e.printStackTrace();
			}
		  	return "-1";
		 }

	  
	
}




