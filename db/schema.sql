DROP
    DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE
    departments (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    roles (
        title VARCHAR(30) NOT NULL,
        department VARCHAR(30) NOT NULL,
        -- FOREIGN KEY (department)
        -- REFERNCES departments(id)
        salary INT NOT NULL
    );

CREATE TABLE
    employees (
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        manager VARCHAR(30) 
    );