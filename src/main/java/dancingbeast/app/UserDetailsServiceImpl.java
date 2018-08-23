package dancingbeast.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import dancingbeast.app.entities.User;
import dancingbeast.app.repos.UsersRepo;

public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	JdbcTemplate template;
	
	@Autowired
	UsersRepo repo;
	
	public UserDetails  loadUserByUsername(String name) {
		User user = template.query("SELECT * FROM users WHERE login=?", repo.usersRowMapper).get(0);

	    UserBuilder builder = null;
	    if (user != null) {
	      builder = org.springframework.security.core.userdetails.User.withUsername(name);
	      builder.password(new BCryptPasswordEncoder().encode(user.getPassword()));
	    } else {
	      throw new UsernameNotFoundException("User not found.");
	    }

	    return builder.build();
		 

	}
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	 

}
