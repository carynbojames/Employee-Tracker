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
    roles.salary,
    employees.manager_id
FROM
    employees
    JOIN roles ON employees.role_id = roles.role_id
    JOIN departments ON roles.dept_id = departments.dept_id;

-- update role
UPDATE employees
SET role_id = 1
WHERE emp_id = 1;


SELECT * FROM employees;

--- These all work independently, but if they're all uncommented, then they don't work

-- SELECT
--     employees.emp_id,
--     employees.first_name,
--     employees.last_name,
--     CONCAT (mgr.first_name, ' ', mgr.last_name) AS manager
-- FROM
--     employees
--     LEFT JOIN employees mgr ON employees.manager_id = mgr.emp_id
    -- the order after ON doesn't matter
    -- Does it not matter because it's referencing the same table? 


-- SELECT
--     emp.emp_id,
--     emp.first_name,
--     emp.last_name,
--     CONCAT (mgr.first_name, ' ', mgr.last_name) AS manager
-- FROM
--     employees emp
--     LEFT JOIN employees mgr ON emp.manager_id = mgr.emp_id


SELECT
    employees.emp_id,
    employees.first_name,
    employees.last_name,
    departments.dept,
    roles.title,
    roles.salary,
    CONCAT (mgr.first_name, ' ', mgr.last_name) AS manager
FROM
    employees
    LEFT JOIN employees mgr ON mgr.emp_id = employees.manager_id
    JOIN roles ON employees.role_id = roles.role_id
    JOIN departments ON roles.dept_id = departments.dept_id;