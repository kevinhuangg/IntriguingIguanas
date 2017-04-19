DROP DATABASE IF EXISTS rootsdb
CREATE DATABASE rootsdb

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(15) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(40) NOT NULL,
  UNIQUE(username, email)
);

CREATE TABLE users_boards (
  id INT PRIMARY KEY,
  user_id INT FOREIGN KEY,
  board_id INT FOREIGN KEY,
  access integer[],
  starred 
)

