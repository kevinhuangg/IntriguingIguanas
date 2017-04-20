DROP DATABASE IF EXISTS rootsdb
CREATE DATABASE rootsdb

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY,
  username VARCHAR(15) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(40) NOT NULL,
  UNIQUE(username, email)
);

CREATE TABLE IF NOT EXISTS boards (
  id INT PRIMARY KEY,
  boardname VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_boards (
  id INT PRIMARY KEY,
  user_id INT FOREIGN KEY,
  board_id INT FOREIGN KEY,
  access integer[],
  starred boolean
);


CREATE TABLE IF NOT EXISTS lists (
  id INT PRIMARY KEY,
  board_id INT FOREIGN KEY,
  listname VARCHAR(30) NOT NULL,
  current_order INT
);

CREATE TABLE tasks (
  id INT PRIMARY KEY,
  list_id INT FOREIGN KEY,
  "text" VARCHAR(250),
  assigned integer[],
  current_order NOT NULL
);