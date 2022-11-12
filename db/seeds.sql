INSERT INTO
    departments (dept)
VALUES
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");

INSERT INTO
    roles (title, salary, dept_id)
VALUES
    ("Lead Engineer", "150000", 1),
    ("Software Engineer", "120000", 1),
    ("Account Manager", "160000", 2),
    ("Accountant", "125000", 2),
    ("Lawyer", "190000", 3),
    ("Legal Team Lead", "250000", 3),
    ("Sales Lead", "100000", 4),
    ("Salesperson", "80000", 4);

INSERT INTO
    employees (first_name, last_name, role_id)
VALUES
    ("John", "Doe", 7),
    ("Mike", "Chan", 8),
    ("Ashley", "Rodriguez", 1), 
    ("Kevin", "Tupik", 2); 