DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE
    departments (
        dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    roles (
        role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
        role_id INT
        -- manager_id INT
        -- FOREIGN KEY (role_id) REFERENCES roles (id),
        -- FOREIGN KEY (manager_id) REFERENCES employees(id)
    );