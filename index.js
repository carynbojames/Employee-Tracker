const inquirer = require("inquirer");

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
					name: "selection"
				},
			])
      .then((response) => {
        switch(response) {
					case response.selection == "View all departments":
						viewDepartments();
					case response.selection == "View all roles":
						viewRoles();
					case response.selection == "View all employees":
						viewEmployees();
					case response.selection == "Add a department":
						addDepartment();
					case response.selection == "Add a role":
						addRole();
					case response.selection == "Add an employee": 
						addEmployee();
					case response.selection == "Update an employee's role":
						updateEmployeeRole();
				}
			})
  }

  function viewDepartments() {}
  function viewRoles() {}
  function viewEmployees() {}
  function addDepartment() {}
  function addRole() {}
  function addEmployee() {}
  function updateEmployeeRole() {}

  initialSelection();
}

init();
