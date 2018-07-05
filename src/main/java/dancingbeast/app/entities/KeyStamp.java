package dancingbeast.app.entities;

import java.sql.Timestamp;

public class KeyStamp {

	
	private int keyId;
	private boolean pressed;
	private Timestamp time;
	
	
	
	public KeyStamp() {
		super();
	}


	public KeyStamp(int keyId, boolean pressed, Timestamp time) {
		super();
		this.keyId = keyId;
		this.pressed = pressed;
		this.time = time;
	}
	
	
	public int getKeyId() {
		return keyId;
	}
	public void setKeyId(int keyId) {
		this.keyId = keyId;
	}
	public boolean isPressed() {
		return pressed;
	}
	public void setPressed(boolean pressed) {
		this.pressed = pressed;
	}


	public Timestamp getTime() {
		return time;
	}


	public void setTime(Timestamp time) {
		this.time = time;
	}

	
	
	
}
