const inquirer = require("inquirer");
require("console.table");
const db = require("./config/connection");

function init() {
  // Create initial drop down menu
  function initialSelection() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee's role",
            "Quit",
          ],
          name: "selection",
        },
      ])
      .then((response) => {
        // switch case strictly compares response.selection with options
        // calls the next inquirer prompt to execute
        switch (response.selection) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add an employee":
            addEmployee();
            break;
          case "Update an employee's role":
            updateEmployeeRole();
            break;
          case "Quit":
            console.log("Goodbye");
            break;
        }
      });
  }

  /// These can be above or below the initialSelection function and still works.
  function viewDepartments() {
    db.query("SELECT * FROM departments", function (err, results) {
      let departmentsArr = results;
      console.log(departmentsArr);
      console.table("Departments", departmentsArr);
    });
    initialSelection();
  }

  function viewRoles() {
    const sql =
      "SELECT * FROM roles JOIN departments ON roles.department_id = departments.id";
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        console.table("Roles", rows);
        initialSelection();
      })
      .catch((err) => console.log(err));
  }

  function viewEmployees() {
    db.query(
      "SELECT * FROM employees JOIN roles ON employees.role_id = roles.department_id",
      function (err, results) {
        console.table("Employees", results);
      }
    );
    initialSelection();
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter department name",
          name: "departmentName",
        },
      ])
      .then((response) => {
        const sql = `INSERT INTO departments (name) VALUES ("${response.departmentName}")`;
        db.promise()
          .query(sql)
          .then(() => initialSelection())
          .catch((err) => console.log(err));
      });
  }

  function addRole() {
    function runInquirer() {
      let departmentsArr = ["Engineering", "Finance", "Legal", "Sales"];
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter title",
            name: "title",
          },
          {
            type: "salary",
            message: "Enter salary",
            name: "salary",
          },
          {
            type: "list",
            message: "Select department",
            choices: departmentsArr,
            name: "departmentId",
          },
        ])
        .then((response) => {
          // Tempporary Solution
          let departmentLoc = departmentsArr.indexOf(response.departmentId);
          let departmentVal = departmentLoc + 1;

          // Code in Progress
          const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${response.title}", "${response.salary}", "${departmentVal}")`;
          db.promise()
            .query(sql)
            .then(() => initialSelection())
            .catch((err) => console.log(err));
        });
    }

    const sql = "SELECT * FROM departments";
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        let deptsTable = rows;
        console.log('deptsTable', deptsTable);
        runInquirer();
      })
      .catch((err) => console.log(err));
  }

  function addEmployee() {
    let rolesArr = ["Lead Engineer", "Software Engineer", "Account Manager"];

    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter first name",
          name: "firstName",
        },
        {
          type: "input",
          message: "Enter last name",
          name: "lastName",
        },
        {
          type: "list",
          message: "Select role",
          choices: rolesArr,
          name: "roles",
        },
      ])
      .then((response) => {
        // Temporary Solution
        let rolesLoc = rolesArr.indexOf(response.roles);
        let rolesVal = rolesLoc + 1;

        // Code in Progress
        const sql = `INSERT INTO roles (first_name, last_name, role_id) VALUES ("${response.firstName}", "${response.lastName}", "${rolesVal}")`;
        db.promise()
          .query(sql)
          .then(() => initialSelection())
          .catch((err) => console.log(err));
      });
  }

  function updateEmployeeRole() {
    let employeeArr = [
      "John Doe",
      "Mike Chan",
      "Ashley Rodriguez",
      "Kevin Tupik",
    ];
    let rolesArr = ["Lead Engineer", "Software Engineer", "Account Manager"];
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select employee",
          choices: employeeArr,
          name: "employee",
        },
        {
          type: "list",
          message: "Select new role",
          choices: rolesArr,
          name: "roles",
        },
      ])
      .then((response) => {
        // Temporary Solution
        let rolesLoc = rolesArr.indexOf(response.roles);
        let rolesVal = rolesLoc + 1;
        let firstName;
        let lastName;

        // Code in Progress
        const sql = `UPDATE employees SET name = ${rolesVal} WHERE first_name = ${firstName}, last_name = ${lastName}`;
        db.promise()
          .query(sql)
          .then(() => initialSelection())
          .catch((err) => console.log(err));
      });
  }

  initialSelection();
}

init();
