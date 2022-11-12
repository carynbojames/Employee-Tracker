-- employee id, first name, last name, job title (role), department (departments), salary (role), manager
-- Employee: employee id, first name, last name, manager
-- Role: job title, salary
-- Departments: department

SELECT
    employees.emp_id,
    employees.first_name,
    employees.last_name,
    departments.dept,
    roles.title,
    roles.salary
FROM employees
JOIN roles ON employees.role_id = roles.role_id
JOIN departments ON roles.dept_id = departments.dept_id;


-- update role

SELECT * FROM employees;

UPDATE employees
SET role_id = 1
WHERE emp_id = 1;

SELECT * FROM employees;

SELECT
    employees.emp_id,
    employees.first_name,
    employees.last_name,
    departments.dept,
    roles.title,
    roles.salary
FROM employees
JOIN roles ON employees.role_id = roles.role_id
JOIN departments ON roles.dept_id = departments.dept_id;

