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


// let deptsDynamic = [];
//         deptsTable.forEach(deptsDynamic.push(deptsTable[1]));
//         console.log('deptsDynamic', deptsDynamic);