// Get an array of the functions ---
require("console.table");
const db = require("../config/connection");

db.query("SELECT * FROM departments", function (err, results) {
  console.log(results);

  let resultsArr = [];

  for (var i = 0; i < results.length; i++) {
    console.log('Object.values(results)', Object.values(results))

    resultsObj = Object.values(results[i]);
    console.log('Object.values(results[i])', resultsObj);
    resultsArr.push(resultsObj[1]);
    // for (var i = 0; i < array01.length; i++) {
    //     array02.push([array01[1]])
  }
  console.log(resultsArr);

  // This finds the value within the array of objects to be able to get the department id that matches with the string value 
  let findIndex = results.findIndex((values) => values.dept === 'Finance') 
  console.log('indexOf', findIndex)
  let indexArrPos = results[findIndex]
  console.log('indexArr', indexArrPos)
  let indexVal = indexArrPos.dept_id
  console.log('indexVal', indexVal)



  // Error Message: This is not a function
  // array01.forEach(array02.push([array01[1]]))
  // console.log(array02)

  // This gave me the same array of objects from the query
  // const DepartmentValues = Object.values(results)
  // console.log(DepartmentValues)
});

// Concat Values ---
db.query("SELECT * FROM employees", (err, results) => {
    console.log(results)
    // let firstName = Object.values(results[1])
    console.log(Object.values(results[1]))
    // let lastName = Object.values(results[2])
    console.log(Object.values(results[2]))
    // let fullName = `${firstName} ${lastName}`
    // console.log("Full Name", fullName)

    let nameArr = []

    // for (var i = 0; i < results.length; i++) {
    //     let firstName = Object.values(results[1])
    //     let lastName = Object.values(results[2])
    //     let fullName = `${firstName} ${lastName}`
        
    //     nameArr.push(fullName) 
    // }
    // console.log('Name Array', nameArr)
})


// Test Concepts ---
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

console.log(person);

const keys = Object.keys(person);
console.log(keys);

const values = Object.values(person);
console.log(values);

console.log("Object.entries", Object.entries(person)); // returns arrays of arrays


// let deptsDynamic = [];
//         deptsTable.forEach(deptsDynamic.push(deptsTable[1]));
//         console.log('deptsDynamic', deptsDynamic);