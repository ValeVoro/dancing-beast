package dancingbeast.app.repos;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import dancingbeast.app.entities.Score;
import dancingbeast.app.entities.User;

@Repository
public class UsersRepo {
	
	@Autowired
	private JdbcTemplate template;
	
	@Autowired
	DancesRepo dancesRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public boolean checkNameAvailability(String name) {
		boolean result = false;
		String SELECT_SQL = "SELECT COUNT(id) FROM users WHERE login='" + name + "'";
		result = template.queryForObject(SELECT_SQL, Integer.class) == 0;
		return result;
	}
	
	public void setScore(String name, int dance, int level, int score) {
		boolean passed = score >= 50;
		String prefetch = "SELECT id FROM levels WHERE levelNr=" + level + " AND dance="+dance;

		int levId = template.queryForObject(prefetch, Integer.class);

		int existingScore = template.queryForObject("SELECT score FROM scores WHERE level=" + levId +
				" AND username='" + name + "'", Integer.class);
		String finalSql;
		if(existingScore == 0) {
			finalSql = "INSERT INTO scores (id, username, level, score, passed) "
				+ "VALUES (DEFAULT, '" + name + "', " + levId + 
				", " + score + ", " + passed + ") ";
			template.execute(finalSql);
		}else if(existingScore < score){
			finalSql = "UPDATE scores SET score=" + score + " WHERE level=" + levId +
					" AND username='" + name + "'";
			template.execute(finalSql);
		}

	}
	
	public int getBeastByName(String name) {
		String SELECT_SQL = "SELECT beast FROM users WHERE login='" + name + "'";
		int result = template.queryForObject(SELECT_SQL, Integer.class);
		return result;
	}
	
	public String getBeastTypeById(int id) {
		String SELECT_SQL = "SELECT type FROM beasts WHERE id='" + id + "'";
		String result = template.queryForObject(SELECT_SQL, String.class);
		return result;
	}
	
	public void addNewUser(String beast, String name, String password) {
		java.util.Date utilDate = new Date();
		java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
		String hashpass = bCryptPasswordEncoder.encode(password);
		
		String params = "(DEFAULT, '" + name + "', '" + hashpass + "', " + beast + ", "+0+", '"+ sqlDate +"')"; 
		String INSERT_SQL = "INSERT INTO users VALUES" + params;

		template.execute(INSERT_SQL);
		
	}
	
	public void authWithHttpServletRequest(HttpServletRequest request, HttpServletResponse resp, String username, String password) {
	    try {
	        request.login(username, password);
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        
	    } catch (ServletException e) {
	        System.out.print("auto login went wrong");
	    } 
	    
	}
	
	public long timeSinceRegistration(String name) {
		String sql = "SELECT registrationDate FROM users WHERE login='" + name + "'";
		Date date1 = template.queryForObject(sql, Date.class);
		Date date2 = new Date();
		return date2.getTime() - date1.getTime();
	}
	
	public void editName(String newName) {
        String oldName = SecurityContextHolder.getContext().getAuthentication().getName();
		String UPDATE_SQL = "UPDATE users SET login = '" + newName + "' WHERE login='" + oldName + "'";
		template.execute(UPDATE_SQL);
	}
	
	public List<String> testingData() {
		List<User> userList = template.query("SELECT * FROM users", usersRowMapper);
		List<String> result = new ArrayList<String>();
		for(User user : userList) {
			result.add(user.getBeast() + ", " + user.getName() + ", " + user.getPassword());
		}
		return result;
	}
	
	public RowMapper<User> usersRowMapper = new RowMapper<User>() {
		@Override
		public User mapRow(ResultSet rs, int i) throws SQLException {
			int id = rs.getInt("id");
			String password = rs.getString("password");
			String login = rs.getString("login");
			int beast = rs.getInt("beast");
			int scoreRecord = rs.getInt("scoreRecord");
			java.sql.Date registrationDate = rs.getDate(6);
			
			return new User(id, login, password, beast, scoreRecord, registrationDate);
		}
	};

}

