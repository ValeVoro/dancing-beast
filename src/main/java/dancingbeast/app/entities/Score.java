package dancingbeast.app.entities;

public class Score {
	
	private String dance;
	private int level;
	private int score;
	
	
	
	public Score() {
		super();
	}

	public Score(String dance, int level, int score) {
		super();
		this.dance = dance;
		this.level = level;
		this.score = score;
	}
	
	public String getDance() {
		return dance;
	}
	public void setDance(String dance) {
		this.dance = dance;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "Score [dance=" + dance + ", level=" + level + ", score=" + score + "]";
	}

	
	
}
