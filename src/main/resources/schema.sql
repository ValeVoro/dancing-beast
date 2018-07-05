CREATE TABLE IF NOT EXISTS beasts (
  id        SERIAL,
  type		VARCHAR(64) NOT NULL,
  
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS users (
  id       			SERIAL,
  login				VARCHAR(64) UNIQUE NOT NULL,
  password  		VARCHAR(64) NOT NULL,
  beast				INTEGER REFERENCES beasts(id),
  scoreRecord		INTEGER,
  registrationDate	DATE,
  
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS scores (
  id			SERIAL,
  username      VARCHAR(64),
  level			INTEGER REFERENCES levels(id),
  score			INTEGER,
  passed		BOOLEAN,
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dances (
  id			SERIAL,
  dance			VARCHAR(64),
  
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS levels (
 	 id					SERIAL,
 	 dance				INTEGER REFERENCES dances(id),
 	 levelNr			INTEGER,
 	 song				VARCHAR(64),
 	 bpm				INTEGER,
 	 defaultMovSeq		VARCHAR(700),	
 	 defaultTimeSeq		VARCHAR(600),
 	 passingScore		INTEGER,
  
 	 PRIMARY KEY (id)
);





