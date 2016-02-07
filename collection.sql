CREATE TABLE collection2 (
title VARCHAR(100),
artist VARCHAR(100),
genre VARCHAR(30),
condi VARCHAR(10),
worth DOUBLE(4,2),
notes TEXT,
released DATE,
added DATE,
opened ENUM('yes','no'),
ID int(11) NOT NULL auto_increment,
PRIMARY KEY (ID));
