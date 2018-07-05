package dancingbeast.app.entities;

import java.sql.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;


public class User{
	
	private int id;
	
	@NotNull
	private String name;
	
	@Min(5)
	private String password;
	
	@NotNull
	private int beast;
	private int scoreRecord;
	private Date registrationDate;
	
	public User(int id, String login, String password, int beast, int scoreRecord, Date registrationDate) {
		super();
		this.id = id;
	
		this.name = login;
		this.password = password;
		this.beast = beast;
		this.scoreRecord = scoreRecord;
		this.registrationDate = registrationDate;
	}
	
	public User() {
		
	}
	
	public User(String name, String password, int beast) {
		super();
		this.name = name;
		this.password = password;
		this.beast = beast;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String login) {
		this.name = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getBeast() {
		return beast;
	}
	public void setBeast(int beast) {
		this.beast = beast;
	}
	public int getScoreRecord() {
		return scoreRecord;
	}
	public void setScoreRecord(int scoreRecord) {
		this.scoreRecord = scoreRecord;
	}
	public Date getRegistrationDate() {
		return registrationDate;
	}
	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}

}
