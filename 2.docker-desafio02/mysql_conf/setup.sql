-- create the databases
CREATE DATABASE IF NOT EXISTS nodedb;

-- Use the database
USE nodedb;

-- Create the 'people' table with an auto-incrementing primary key
CREATE TABLE IF NOT EXISTS people (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY(id)
);
