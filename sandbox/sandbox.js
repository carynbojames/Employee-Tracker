require("console.table");
const db = require("../config/connection");

db.query("SELECT * FROM departments", function (err, results) {
    console.log(results);
    
    let array01 = []
    let array02 = []

    for (var i = 0; i < results.length; i++) {
        array01 = (Object.values(results[i]))
        console.log(array01)
        array02.push(array01[1])
        // for (var i = 0; i < array01.length; i++) {
        //     array02.push([array01[1]])
    }
    console.log(array02)
    

    // Error Message: This is not a function
    // array01.forEach(array02.push([array01[1]]))
    // console.log(array02)


    // This gave me the same array of objects from the query
    // const DepartmentValues = Object.values(results)
    // console.log(DepartmentValues)
})



// let deptsDynamic = [];
//         deptsTable.forEach(deptsDynamic.push(deptsTable[1]));
//         console.log('deptsDynamic', deptsDynamic);


const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
    };


console.log(person)

const keys = Object.keys(person);
console.log(keys)

const values = Object.values(person)
console.log(values)
