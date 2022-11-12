require("console.table");
const db = require("../config/connection");

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