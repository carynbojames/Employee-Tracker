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
    employees (first_name, last_name, role_id, manager)
VALUES
    ("John", "Doe", 7, null),
    ("Mike", "Chan", 8, 1),
    ("Ashley", "Rodriguez", 1, null), 
    ("Kevin", "Tupik", 2, 3),
    ("Kunal", "Singh", 3, null),
    ("Malia", "Brown", 4, 5);