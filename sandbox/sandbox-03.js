require("console.table");
const db = require("../config/connection");

// Concat Values ---
db.query(
  "SELECT emp_id, first_name, last_name FROM employees",
  (err, results) => {
    console.log(results);
    console.log(Object.values(results[1])); // index[1] converted from an obj to an array
    console.log(Object.values(results[2])); // index[2] converted from an obj to an array

    let employeesArr = [];

    for (var i = 0; i < results.length; i++) {
      let resultsArr = Object.values(results[i]);

      // let fullName = `${resultsArr[1]} ${resultsArr[2]}`
      // console.log(fullName)
      // employeesArr.push(fullName)

      employeesArr.push(`${resultsArr[1]} ${resultsArr[2]}`);
    }
    console.log("Name Array", employeesArr);

    let findIndex = results.findIndex(
      (values) => values.first_name === "John" && values.last_name == "Doe"
    );
    let indexArr = results[findIndex];
    let empId = indexArr.emp_id;

    console.log("indexArr", indexArr);
    console.log("empId", empId);
  }
);

let fullName = "John Doe"
let array01 = fullName.split(' ')
console.log('John Doe:', array01)

let array02 = fullName.split(" ")
console.log('John Doe:', array02)