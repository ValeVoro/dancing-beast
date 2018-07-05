package dancingbeast.app;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import dancingbeast.app.entities.KeyStamp;

@SpringBootApplication
@ComponentScan
public class DanceApplication {
	
	@Autowired
//	private PersonsRepository personsRepo;

	public static void main(String[] args) {
		SpringApplication.run(DanceApplication.class, args);


		
	}
	
	@PostConstruct
	public void afterStartup() {
		System.out.println("Startup completed!");
	/*	BACKUP FOR GENERATING SEQUENCE
	 * 
	 * List<KeyStamp> rigthKeys = new ArrayList<KeyStamp>();
		
		 rigthKeys.add(new KeyStamp(0, true, new Timestamp(0)));

		 //Top rock 1
		 int a = 1;
		 double istart = (2.0/60.0)*1000.0;
		 double iend = 5.0*1000.0 + ((2.0/60.0)*1000.0);
		 double iter = (10.0/60.0)*1000.0;

		 for(double i = istart; i<= iend; i=i+iter) {
			 int key = a % 4 == 1 ? 39 : (a % 4 == 3 ? 37 : 0);
			 if(key != 0) {
				 rigthKeys.add(new KeyStamp(key, true, new Timestamp( (long) i )));
			 }
			 a++;
		 }
		 
		 //Hj 2 
		 rigthKeys.add(new KeyStamp(72, true, new Timestamp( (long) (5.0*1000.0 + 12.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (5.0*1000.0 + 24.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long)  (6.0*1000.0 + 10.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long)  (6.0*1000.0 + 28.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long)  (7.0*1000.0 + 17.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long)  (8.0*1000.0 + 9.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long)  (8.0*1000.0 + 29.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long)  (9.0*1000.0 + 21.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long)  (10.0*1000.0 + 10.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(72, false, new Timestamp( (long)  (10.0*1000.0 + 22.0/60.0*1000.0) )));

		 //Top rock 3
		 int w = 1;
		 for(double i = 11.0*1000.0 + 2.0/60.0*1000.0; i<= 15.0*1000.0 + 12.0/60.0*1000.0; i=i+10.0/60.0*1000.0) {
			 int key = w % 4 == 0 ? 39 : (w % 4 == 2 ? 37 : 0);
			 if(key != 0) {
				 rigthKeys.add(new KeyStamp(key, true, new Timestamp( (long) i )));
			 }
			 w++;
		 }
		 
		 // Flare 4
		 rigthKeys.add(new KeyStamp(70, true, new Timestamp( (long) (15.0*1000.0 + 22.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(70, false, new Timestamp( (long) (19.0*1000.0 + 11.0/60.0*1000.0) ))); 
		
		 // Top rock 5
		 int q = 1;
		 for(double i = 19.0*1000.0 + 11.0/60.0*1000.0; i<= 28.0*1000.0 + 11.0/60.0*1000.0; i=i+10.0/60.0*1000.0) {
			 int key = q % 4 == 0 ? 39 : (q % 4 == 2 ? 37 : 0);
			 if(key != 0) {
				 rigthKeys.add(new KeyStamp(key, true, new Timestamp( (long) i)));
			 }
			 q++;
		 }
		 
		 //Hj 6
		 rigthKeys.add(new KeyStamp(72, true, new Timestamp( (long) (28.0*1000.0 + 21.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (29.0*1000.0 + 3.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (29.0*1000.0 + 19.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (30.0*1000.0 + 7.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (30.0*1000.0 + 26.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (31.0*1000.0 + 18.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (32.0*1000.0 + 8.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (33.0*1000.0 + 0.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (33.0*1000.0 + 19.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(72, false, new Timestamp( (long) (34.0*1000.0 + 1.0/60.0*1000.0) )));

		 //Top rock 7
		 int e = 1;
		 for(double i = 34.0*1000.0 + 11.0/60.0*1000.0; i<= 38.0*1000.0 + 21.0/60.0*1000.0; i=i+10.0/60.0*1000.0) {
			 int key = e % 4 == 0 ? 39 : (e % 4 == 2 ? 37 : 0);
			 if(key != 0) {
				 rigthKeys.add(new KeyStamp(key, true, new Timestamp( (long) i)));
			 }
			 e++;
		 }
		 
		 //Flare 8
		 rigthKeys.add(new KeyStamp(70, true, new Timestamp( (long) (39.0*1000.0 + 1.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(70, false, new Timestamp( (long) (38.0*1000.0 + 21.0/60.0*1000.0) ))); 
		 
		 //Hj 9
		 rigthKeys.add(new KeyStamp(72, true, new Timestamp( (long) (42.0*1000.0 + 20.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (43.0*1000.0 + 2.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (44.0*1000.0 + 6.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (44.0*1000.0 + 25.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (45.0*1000.0 + 17.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (46.0*1000.0 + 7.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (46.0*1000.0 + 29.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (47.0*1000.0 + 18.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(72, false, new Timestamp( (long) (48.0*1000.0 + 0.0/60.0*1000.0) )));

		 //Top rock 10
		 int t = 1;
		 for(double i = 48.0*1000.0 + 10.0/60.0*1000.0; i<= 53.0*1000.0 + 20.0/60.0*1000.0; i=i+10.0/60.0*1000.0) {
			 int key = t % 4 == 0 ? 39 : (t % 4 == 2 ? 37 : 0);
			 if(key != 0) {
				 rigthKeys.add(new KeyStamp(key, true, new Timestamp( (long) i)));
			 }
			 t++;
		 }
		 
		 //Hj 11
		 rigthKeys.add(new KeyStamp(72, true, new Timestamp( (long) (54.0*1000.0 + 0.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (54.0*1000.0 + 12.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (54.0*1000.0 + 28.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (55.0*1000.0 + 16.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (56.0*1000.0 + 5.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (56.0*1000.0 + 27.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(74, true, new Timestamp( (long) (57.0*1000.0 + 17.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(72, false, new Timestamp( (long) (58.0*1000.0 + 9.0/60.0*1000.0) )));

		 //Top rock 12
		 int y = 1;
		 for(double i = 58.0*1000.0 + 19.0/60.0*1000.0; i<= 1.0*60.0*1000.0 + 1.0*1000.0 + 1.0/60.0*1000.0; i=i+10.0/60.0*1000.0) {
			 int key = y % 4 == 0 ? 39 : (y % 4 == 2 ? 37 : 0);
			 if(key != 0) {
				 rigthKeys.add(new KeyStamp(key, true, new Timestamp( (long) i)));
			 }
			 y++;
		 }
		 
		 //Flare 13
		 rigthKeys.add(new KeyStamp(70, true, new Timestamp( (long) (1.0*60.0*1000.0 + 1.0*1000.0 + 11.0/60.0*1000.0) )));
		 rigthKeys.add(new KeyStamp(70, false, new Timestamp( (long) (1.0*60.0*1000.0 + 8.0*1000.0 + 9.0/60.0*1000.0) ))); 
		 
		 //Top rock 14
		 int u = 1;
		 for(double i = 1.0*60.0*1000.0 + 8.0*1000.0 + 9.0/60.0*1000.0; i<= 1.0*60.0*1000.0 + 11.0*1000.0 + 29.0/60.0*1000.0; i=i+10.0/60.0*1000.0) {
			 int key = u % 4 == 0 ? 39 : (u % 4 == 2 ? 37 : 0);
			 if(key != 0) {
				 rigthKeys.add(new KeyStamp(key, true, new Timestamp( (long) i)));
			 }
		 }
		 
		 for(KeyStamp k : rigthKeys) {
			 long f = k.getTime().getTime();
			 f = f + 3*1000;
			 
			 System.out.print("{keyId: " + k.getKeyId() + ", pressed: " + k.isPressed() + 
					 ", time: " + f + "}, ");
		 } */
	}
}
