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
            process.exit();
        }
      });
  }

  /// These can be above or below the initialSelection function and still works.
  function viewDepartments() {
    db.query("SELECT * FROM departments", function (err, results) {
      console.table("Departments", results);
    });
    initialSelection();
  }

  function viewRoles() {
    const sql =
      "SELECT * FROM roles JOIN departments ON roles.dept_id = departments.dept_id";
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
      "SELECT employees.emp_id, employees.first_name, employees.last_name, departments.dept, roles.title, roles.salary, employees.manager FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id",
      function (err, results) {
        console.table("", results);
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
          name: "department",
        },
      ])
      .then((response) => {
        const sql = `INSERT INTO departments (name) VALUES ("${response.department}")`;
        db.promise()
          .query(sql)
          .then(() => initialSelection())
          .catch((err) => console.log(err));
      });
  }

  function addRole() {
    let departmentsArr = [] // Passed into the inquirer question
    let departmentsObj = [] // Used to convert department name to a department id

    function runInquirer() {
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
            name: "department",
          },
        ])
        .then((response) => {
          // Convert the selected department string to the department id
          console.log("Selected Department", response.department);
          console.log("deptsObj", departmentsObj);

          // Find the index array value w/ the selected department name in the array of objects
          let findIndex = departmentsObj.findIndex(
            (values) => values.name === response.dept
          );
          console.log("findIndex", findIndex);

          // Isolate the object that has the selected department name
          let indexArr = departmentsObj[findIndex];
          console.log("indexArr", indexArr);

          // Return the department id
          let departmentId = indexArr.dept_id;
          console.log("departmentId", departmentId);

          // Run the query
          const sql = `INSERT INTO roles (title, salary, dept_id) VALUES ("${response.title}", "${response.salary}", "${departmentId}")`;
          db.promise()
            .query(sql)
            .then(() => initialSelection())
            .catch((err) => console.log(err));
        });
    }

    // Create a dynamic list of departments values for inquirer prompt
    // Run query of the departments table
    const sql = "SELECT * FROM departments";
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        // --- Data from the departments table is queried and returned as an array of objects ---
        console.log("deptsTable", rows);
        
        // --- Convert the array of objects to an array for the inquirer prompt ---
        for (var i = 0; i < rows.length; i++) {
          // Converts each object in the array of objects to an array
          rowsArray = Object.values(rows[i]);
          // The first index value is added to a new array
          // The departments array holds all the department names and is passed into an inquirer question
          departmentsArr.push(rowsArray[1]);
        }
        console.log(departmentsArr);
        departmentsObj = rows
        runInquirer();
      })
      .catch((err) => console.log(err));
  }

  function addEmployee() {
    let rolesArr = []
    let rolesObj = []

    function runInquirer() {
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
          }
        ])
        .then((response) => {
          let findIndex = rolesObj.findIndex((values) => values.title === response.roles)
          let indexArr = rolesObj[findIndex]
          let roleId = indexArr.role_id

          console.log('indexArr', indexArr)
          console.log('roleId', roleId)

          const sql = `INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ("${response.firstName}", "${response.lastName}", "${roleId}", 2)`;
          db.promise()
            .query(sql)
            .then(() => initialSelection())
            .catch((err) => console.log(err));
        });
    }

    const sql = "SELECT role_id, title FROM roles";
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        for (var i = 0; i < rows.length; i++) {
          rowsArr = Object.values(rows[i]);
          rolesArr.push(rowsArr[1]);
        }
        runInquirer()
        rolesObj = rows
        console.log(rolesArr);
      })
      .catch((err) => console.log(err));
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

        // Code in Progress
        const sql = `UPDATE employees SET role_id = ${rolesVal} WHERE emp_id = ${firstName}`;
        db.promise()
          .query(sql)
          .then(() => initialSelection())
          .catch((err) => console.log(err));
      });
  }

  initialSelection();
}

init();
