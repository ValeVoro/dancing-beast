package dancingbeast.app;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	
	@Autowired
	private DataSource dataSource;
	
	
	@Value("${spring.queries.users-query}")
	private String usersQuery;
	

	@Override
	protected void configure(AuthenticationManagerBuilder auth)
			throws Exception {
		auth.
			jdbcAuthentication()
			    .passwordEncoder(bCryptPasswordEncoder)
				.usersByUsernameQuery(usersQuery)
				.dataSource(dataSource)
		        .authoritiesByUsernameQuery("SELECT login, 'ROLE_USER' FROM users WHERE login=?");

	}
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http
	      .headers().disable()
	  	  .csrf().disable();
		http
            .authorizeRequests()
                .antMatchers("/login", "/registration", "/sendRegistration", "/setName", "/js/**", "/css/**", "/img/**", "/fonts/**", "/webjars/*").permitAll();
      
        http
       	.authorizeRequests()
               .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .usernameParameter("username").passwordParameter("password")
                .failureUrl("/loginfailure")
                .defaultSuccessUrl("/dashboard", true)
                .permitAll()
                .and()
            .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            	.logoutSuccessUrl("/login")
                .permitAll();
    }
	
	 @Override
	  public void configure(WebSecurity web) throws Exception {
	 //   web.ignoring().antMatchers("/css/**");
	  }
	 


}

