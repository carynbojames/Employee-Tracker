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
				// switch case strictly compares response.selection with options
				// calls the next inquirer prompt to execute
        switch(response.selection) { 
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
			})			
  };

	/// These can be above or below the initialSelection function and still works. 
	function viewDepartments() {console.log("Hello test viewDepartments function")}
	function viewRoles() {}
	function viewEmployees() {}
	function addDepartment() {}
	function addRole() {}
	function addEmployee() {}
	function updateEmployeeRole() {}

  initialSelection();
}

init();
