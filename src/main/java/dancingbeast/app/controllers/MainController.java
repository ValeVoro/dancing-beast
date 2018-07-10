package dancingbeast.app.controllers;

import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import dancingbeast.app.entities.Level;
import dancingbeast.app.entities.Score;
import dancingbeast.app.entities.User;
import dancingbeast.app.repos.DancesRepo;
import dancingbeast.app.repos.UsersRepo;



@Controller
public class MainController {
  
	@Autowired
    @Qualifier("authenticationManager")
    protected AuthenticationManager authenticationManager;
	
	@Autowired
	UsersRepo usersRepo;
	
	@Autowired
	DancesRepo dancesRepo;
	
	@Autowired
	RegisterRestController rest;
	
	@RequestMapping("/dashboard")
	public String dashboard(Model m) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		int beast = usersRepo.getBeastByName(currentPrincipalName);
		String beastType = usersRepo.getBeastTypeById(beast);
		List<Object> dances = dancesRepo.getAllDances();
		List<Score> scores = dancesRepo.getScores(currentPrincipalName);
		String status = usersRepo.timeSinceRegistration(currentPrincipalName) < 604800000 ? "Newbie" : "Old-timer";

		m.addAttribute("name", currentPrincipalName);
		m.addAttribute("beast", beast);
		m.addAttribute("beastType", beastType);
		m.addAttribute("dances", dances);
		m.addAttribute("scores", scores);
		m.addAttribute("status", status);
		return "dashboard";
	}
	
	@RequestMapping("/start")
	public String start(@RequestParam("dance") String dance, @RequestParam("level") int level, Model m){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		if(dancesRepo.checkEligibility(currentPrincipalName, dance, level)) {
			int beast = usersRepo.getBeastByName(currentPrincipalName);
			String beastType = usersRepo.getBeastTypeById(beast);
			m.addAttribute("name", currentPrincipalName);
			m.addAttribute("beast", beast);
			m.addAttribute("beastType", beastType);
			m.addAttribute("levelInfo", dancesRepo.getLevelInfo(dance, level));
			return "dance";			
			
		}else {
			return "redirect:/dashboard";
		}
	}
	
	
	@RequestMapping("/login")
	public String login(Model m) {

		return "index";
	}
	
	
	  @RequestMapping("/loginfailure")
	  public String loginError(Model model) {
	    model.addAttribute("loginError", true);
	    return "index";
	  }
	  
	  @RequestMapping(value="/registration")
		 public String registration(Model model){
			return "register";
		 }
	  
	  @RequestMapping(value = "/")
	    public String addData(Model model) {
		  
	     return "redirect:/dashboard";
	}	
	  
	
	  
	  @RequestMapping(value="/editName")
		 public String changeName(@RequestBody String name, HttpServletRequest req, HttpServletResponse res){
		  	
		  usersRepo.editName(name);
	  		Object det = SecurityContextHolder.getContext().getAuthentication().getDetails();
	  		Object login = SecurityContextHolder.getContext().getAuthentication().getName();
	  		Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
	  		
	  		UsernamePasswordAuthenticationToken newAuthentication = new UsernamePasswordAuthenticationToken(
	                name, null, authorities); 
	  		newAuthentication.setDetails(det);
	  		
	  		SecurityContextHolder.getContext().setAuthentication(newAuthentication);
	        req.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

	  		
	  		return "redirect:/dashboard";
		 }
}




