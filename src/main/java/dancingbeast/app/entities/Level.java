package dancingbeast.app.entities;

import java.util.List;

public class Level {
	private String dance;
	private int levelNo;
	private String song;
	private int bpm;
	private String[] defaultMovSeq;
	private String[] defaultTimeSeq;
	private int duration;
	/*movement: {name, level, [1, 5], ["hip-left", "hip-right"]}
	 * 
	 */

	private int[] totalTimeSequence;
	private String[] totalMovSecuense;
	
	
	public Level(String dance, int levelNo, String song, String[] defaultMovSeq, String[] defaultTimeSeq, int bpm, int duration) {
		super();
		this.dance = dance;
		this.levelNo = levelNo;
		this.song = song;
		this.defaultMovSeq = defaultMovSeq;
		this.defaultTimeSeq = defaultTimeSeq;
		this.bpm = bpm;
		this.duration =duration;
	}
	
	public Level(String dance, int levelNo, String song, int bpm, String[] defaultMovSeq, String[] defaultTimeSeq) {
		super();
		this.dance = dance;
		this.levelNo = levelNo;
		this.song = song;
		this.bpm = bpm;
		this.defaultMovSeq = defaultMovSeq;
		this.defaultTimeSeq = defaultTimeSeq;
	}
	public String getDance() {
		return dance;
	}
	public void setDance(String dance) {
		this.dance = dance;
	}
	public int getLevelNo() {
		return levelNo;
	}
	public void setLevelNo(int levelNo) {
		this.levelNo = levelNo;
	}
	public String getSong() {
		return song;
	}
	public void setSong(String song) {
		this.song = song;
	}
	public int getBpm() {
		return bpm;
	}
	public void setBpm(int bpm) {
		this.bpm = bpm;
	}
	public String[] getDefaultMovSeq() {
		return defaultMovSeq;
	}
	public void setDefaultMovement(String[] defaultMovSeq) {
		this.defaultMovSeq = defaultMovSeq;
	}
	public int[] getTotalTimeSequence() {
		return totalTimeSequence;
	}
	public void setTotalTimeSequence(int[] totalTimeSequence) {
		this.totalTimeSequence = totalTimeSequence;
	}
	public String[] getTotalMovSecuense() {
		return totalMovSecuense;
	}
	public void setTotalMovSecuense(String[] totalMovSecuense) {
		this.totalMovSecuense = totalMovSecuense;
	}

	public String[] getDefaultTimeSeq() {
		return defaultTimeSeq;
	}

	public void setDefaultTimeSeq(String[] defaultTimeSeq) {
		this.defaultTimeSeq = defaultTimeSeq;
	}

	public void setDefaultMovSeq(String[] defaultMovSeq) {
		this.defaultMovSeq = defaultMovSeq;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	
}
