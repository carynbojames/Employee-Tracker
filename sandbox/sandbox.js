require("console.table");
const db = require("../config/connection");

db.query("SELECT * FROM departments", function (err, results) {
    let departmentsArr = results;
    console.log(departmentsArr);
})