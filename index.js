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
      console.table("Departments", results);
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
    let departmentsArr = []
    let departmentsObj = []
    
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
          console.log('Selected Department', response.department)
          console.log('deptsObj', departmentsObj)
          
          // Find the index array value w/ the selected department name in the array of objects
          let findIndex = departmentsObj.findIndex((values) => values.name === response.department) 
          console.log('findIndex', findIndex)

          // Isolate the object that has the selected department name
          let indexArr = departmentsObj[findIndex]
          console.log('indexArr', indexArr)
          
          // Return the department id
          let departmentId = indexArr.id
          console.log('departmentId', departmentId)

          // Run the query
          const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${response.title}", "${response.salary}", "${departmentId}")`;
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
      departmentsObj = rows
      console.log('deptsObj', departmentsObj)

      // --- Convert the array of objects to an array for the inquirer prompt ---
      for (var i = 0; i < rows.length; i++) {
        // Converts each object in the array of objects to an array
        rowsArray = (Object.values(rows[i])) 
        // The first index value is added to a new array
        // The departments array holds all the department names and is passed into an inquirer question
        departmentsArr.push(rowsArray[1])
      }
      console.log(departmentsArr)
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
