package dancingbeast.app.controllers;


import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class UserController {
	
//	@RequestMapping(path="/user", method = RequestMethod.GET)
	//public ResponseEntity<User> listUser(){
		//return new ResponseEntity<User>(getUsers(), HttpStatus.OK);
	//}
	
	//@RequestMapping(path="/user/{id}", method = RequestMethod.GET)
	//public ResponseEntity  listUser(@PathVariable(value = "id") String id){
		//return new ResponseEntity<User>(getUsers().stream().filter(user -> user.getId().equals(id)).findFirst().orElse(null), HttpStatus.OK);
		
	//}
	
	//@RequestMapping(path="/user", method = RequestMethod.POST)
	//public ResponseEntity<User>  listUser(@RequestBody User user){
		//return new ResponseEntity ("18", HttpStatus.OK);
	//}
	
}
