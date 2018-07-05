package dancingbeast.app.controllers;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.svenson.JSONParser;

import dancingbeast.app.entities.KeyStamp;
import dancingbeast.app.repos.DancesRepo;
import dancingbeast.app.repos.UsersRepo;


@ComponentScan
@RestController
public class DashboardController {
	
	@Autowired
    @Qualifier("authenticationManager")
    protected AuthenticationManager authenticationManager;
	
	@Autowired
	UsersRepo usersRepo;
	
	@Autowired
	DancesRepo dancesRepo;

	
	 @RequestMapping(value="/sendSequence", method = RequestMethod.POST)
	 public int processSequence(@RequestBody List<KeyStamp> seq) {
		 	
		 try {

		 	int dance = 1;
		 	int level = 1;

		 		String rightKeys = dancesRepo.getSequence(dance, level);
		 		JSONParser parser = new JSONParser();
		        double score = 0.0;
		        
		 		// ----- Iterate over right key sequence -----
		        parser.addTypeHint("{}", KeyStamp.class);

		        ArrayList list = parser.parse(ArrayList.class, rightKeys);
		        List<KeyStamp> result = new ArrayList<KeyStamp>();
		        for(int i = 0 ; i < list.size() ; i++){
		            KeyStamp example = new KeyStamp();
		            HashMap<String, ?> map1 = (HashMap) list.get(i);
		            example.setKeyId( Integer.parseInt(map1.get("keyId").toString()));
		            example.setPressed( (boolean) map1.get("pressed"));
		            example.setTime( new Timestamp( (long) map1.get("time") ));
		            result.add(example);
		        }

			 	long firstTime = seq.get(0).getTime().getTime();
		        for (KeyStamp entry : result) {
		            // Iterate passed values

		        	for(KeyStamp passedStamp : seq) {
		        		
		        		if( (entry.getKeyId()==passedStamp.getKeyId()) && 
		        			(entry.isPressed()==passedStamp.isPressed())) {
		        			long diff = passedStamp.getTime().getTime() - firstTime;
		        			long ratio = Math.abs(entry.getTime().getTime() - diff);

		        			if(ratio <= 800 && ratio > 500) {
		        				score += 75.0;
		        			}else if(ratio <= 500) {
		        				score += 100.0;

		        			}
		        		}
		        		
		        		
		        	}
		        			        			       	
		        }
		        score = score / result.size();
		        double in1 = (double) result.size() / (double) seq.size();
		        double in2 = (double) seq.size() / (double) result.size();
		        double inaccuracy = Math.min( in1, in2 );

		 		score = score*inaccuracy;
		 		
		 		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				String currentPrincipalName = authentication.getName();
				usersRepo.setScore(currentPrincipalName, dance, level, (int) score);
				
		 return  (int) score;
		
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 return -1;
	 }
}









