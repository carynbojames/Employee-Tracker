DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE
    departments (
        dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        dept VARCHAR(100) NOT NULL
    );

CREATE TABLE
    roles (
        role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        -- also a primary key for employees table
        title VARCHAR(30) NOT NULL,
        salary DECIMAL NOT NULL,
        dept_id INT,
        FOREIGN KEY (dept_id) REFERENCES departments (dept_id) ON DELETE SET NULL
    );

CREATE TABLE
    employees (
        emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT,
        manager INT,
        FOREIGN KEY (role_id) REFERENCES roles (role_id)
        -- FOREIGN KEY (manager_id) REFERENCES employees(id)
    );