DROP DATABASE IF EXISTS great_bay;

CREATE DATABASE great_bay;

USE great_bay;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  itemName VARCHAR(45) NOT NULL,
  bid INTEGER,
  note VARCHAR(255),
  PRIMARY KEY (id)
);

INSERT INTO items (itemName, bid, note)
VALUES ("table", 20, "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ");

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (username, password)
VALUES ("tej123", "test1234");


CREATE TABLE bid_user (
  item_id INT NOT NULL,
  username VARCHAR(45) NOT NULL,
  bidByUser INTEGER NOT NULL,
  PRIMARY KEY (id)
);