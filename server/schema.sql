CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  message_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  content VARCHAR(3000) NULL,
  user_id INTEGER(10) NOT NULL DEFAULT 1,
  room_id INTEGER(10) NOT NULL DEFAULT 1,
  PRIMARY KEY (message_id)
);
/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  user_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL DEFAULT 'Anonymous',
  PRIMARY KEY (user_id),
  CONSTRAINT unique_name UNIQUE (username)
);

CREATE TABLE rooms (
  room_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(20) NOT NULL DEFAULT 'Lobby',
  PRIMARY KEY (room_id),
  CONSTRAINT unique_name UNIQUE (roomname)
);

INSERT INTO users (username) VALUES ("Anonymous");
INSERT INTO rooms (roomname) VALUES ("Lobby");


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

