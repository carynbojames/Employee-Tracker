// Get an array of the functions ---
require("console.table");
const db = require("../config/connection");

db.query("SELECT * FROM departments", function (err, results) {
  console.log('results', results);

  let resultsArr = [];

  for (var i = 0; i < results.length; i++) {
    // console.log('Object.values(results)', Object.values(results))

    resultsObj = Object.values(results[i]);
    console.log('Object.values(results[i]):', resultsObj);
    resultsArr.push(resultsObj[1]);
    // console.log('resultsArr(i):', resultsArr)
    // for (var i = 0; i < array01.length; i++) {
    //     array02.push([array01[1]])
  }
  console.log('resultsArr', resultsArr);

  // This finds the value within the array of objects to be able to get the department id that matches with the string value 
  let findIndexMan = results.findIndex((mango) => mango.dept === 'Finance') // values is an object into results
  console.log('indexOfMango', findIndexMan)

  // find the index position. values 
  let findIndex = results.findIndex((values) => values.dept === 'Finance') // values is an object into results
  console.log('indexOf', findIndex)
  
  // return the object of the index position
  let indexArrPos = results[findIndex]
  console.log('indexArr', indexArrPos)
  let indexValId = indexArrPos.dept_id // 
  console.log('indexVal', indexValId)
  let indexValPos = indexArrPos.dept
  console.log('indexValPos', indexValPos)

  let findIndexId = results.findIndex((value) => value.dept_id === 6)
  console.log('indexOfId', findIndexId)


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