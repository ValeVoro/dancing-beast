package dancingbeast.app.repos;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dancingbeast.app.entities.Level;
import dancingbeast.app.entities.Score;

@Repository
public class DancesRepo {
	
	@Autowired
	private JdbcTemplate template;
	
	public List<String[]> getAllDances(){
		List<String[]> danceList = template.query("SELECT dances.dance as dance, "
				+ "COUNT(levels.id) as levels FROM dances INNER JOIN levels "
				+ "ON dances.id=levels.dance GROUP BY dances.dance", allDanceRowmapper);
		return danceList;
	}
	
	public RowMapper<String[]> allDanceRowmapper = new RowMapper<String[]>() {
		@Override
		public String[] mapRow(ResultSet rs, int i) throws SQLException {
			String[] result = new String[2];
			String dance = rs.getString("dance");
			String levels = rs.getInt("levels") + "";
			result[0] = dance;
			result[1] = levels;
			return result;
		}
	};
	
	public List<Score> getScores(String username){
		List<Score> scoresList = template.query("SELECT dances.dance as dance, "
				+ "levels.levelNr as level, scores.score as score FROM levels " + 
				"FULL JOIN scores ON scores.level=levels.id " + 
				"FULL JOIN dances ON levels.dance=dances.id " + 
				"WHERE scores.username='"+ username +"' OR scores.username is null " + 
				"GROUP BY dances.dance, levels.levelNr, scores.score", scoresRowmapper);
		return scoresList;
	}
	
	public RowMapper<Score> scoresRowmapper = new RowMapper<Score>() {
		@Override
		public Score mapRow(ResultSet rs, int i) throws SQLException {
			String dance = rs.getString("dance");
			int level = rs.getInt("level");
			int score = rs.getInt("score");
	
			return new Score(dance, level, score);
		}
	};
	
	public boolean checkEligibility(String username, String dance, int level) {
		if(level==1) {
			return true;
		}else {
			String s = "SELECT COUNT(scores.score) FROM levels " + 
					"FULL JOIN scores ON scores.level=levels.id " + 
					"FULL JOIN dances ON levels.dance=dances.id " + 
					"WHERE scores.username='"+ username +"' AND dances.dance='"+ dance +"' " + 
					"AND levels.levelNr=" + (level-1);
			return template.queryForObject(s, Integer.class) > 0;
		}
	}
	
	public String getSequence(int dance, int level) {
		String s = "SELECT sequence FROM levels WHERE dance=" + dance + " "
				+ "AND levelNr=" + level;
		return template.queryForObject(s, String.class);
	}
	
	public List<Level> getLevelInfo(String dance, int level){
		List<Level> levelInfo = template.query("SELECT levels.song as song, "
				+ "levels.levelnr as level,  dances.dance as dance, levels.defaulttimeseq "
				+ "as timeseq, levels.defaultmovseq as movseq, levels.bpm as bpm,"
				+ "levels.duration as duration from levels " + 
				"INNER JOIN dances ON levels.dance=dances.id " + 
				"WHERE levels.levelnr="+ level +" " + 
				"AND dances.dance='"+ dance + "'", levelRowmapper);
		return levelInfo;
	}
	
	public RowMapper<Level> levelRowmapper = new RowMapper<Level>() {
		@Override
		public Level mapRow(ResultSet rs, int i) throws SQLException {
			String song = rs.getString("song");
			int level = rs.getInt("level");
			int bpm = rs.getInt("bpm");
			int duration = rs.getInt("duration");
			String dance = rs.getString("dance");
			String[] timeseq = rs.getString("timeseq").split(", ");
			String[] movseq = rs.getString("movseq").split(", ");	
	
			return new Level(dance, level, song, movseq, timeseq, bpm, duration);
		}
	};
}





