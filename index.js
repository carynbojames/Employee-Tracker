const inquirer = require("inquirer");
const db = require("./config/connection");
/// Why does uncommenting the above cause the inquirer drop down not to work?

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
        }
      });
  }

  /// These can be above or below the initialSelection function and still works.
  function viewDepartments() {
    db.query("SELECT * FROM departments", function (err, results) {
      console.table(results); // Formatting isn't correct
    });
    initialSelection();
  }

  function viewRoles() {
    const sql =
      "SELECT * FROM roles JOIN departments ON roles.department_id = departments.id";
    db.promise()
      .query(sql)
      .then((results) => {
        console.log(results)
        initialSelection();
      })
      .catch((err) => console.log(err));
  }

  function viewEmployees() {
    db.query(
      "SELECT * FROM employees JOIN roles ON employees.role_id = roles.department_id",
      function (err, results) {
        console.table(results);
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
    let departmentsArr;
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
          name: "lastName",
        },
        {
          type: "list",
          message: "Select department",
          choices: departmentsArr,
          name: "departmentId",
        },
      ])
      .then((response) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${response.firstName}", "${response.lastName}", "${response.departmentId}")`;
        db.promise()
          .query(sql)
          .then(() => initialSelection())
          .catch((err) => console.log(err));
      });
  }

  function addEmployee() {
    // let departmentsArr
    // inquirer
    //   .prompt([
    //     {
    //       type: "input",
    //       message: "Enter first name",
    //       name: "firstName",
    //     },
    //     {
    //       type: "input",
    //       message: "Enter last name",
    //       name: "lastName",
    //     },
    //     {
    //       type: "list",
    //       message: "Select department",
    //       choices: departmentsArr,
    //       name: "roleId"
    //     }
    //   ])
    //   .then((response) => {
    //     const sql = `INSERT INTO roles (first_name, last_name) VALUES ("${response.firstName}", "${response.lastName})`;
    //     db.promise()
    //       .query(sql)
    //       .then(() => initialSelection())
    //       .catch((err) => console.log(err));
    //   });
  }

  function updateEmployeeRole() {}

  initialSelection();
}

init();
