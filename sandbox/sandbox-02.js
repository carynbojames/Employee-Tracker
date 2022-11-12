require("console.table");
const db = require("../config/connection");

let rolesArr = [];
let rolesObj = [];

const sql = "SELECT role_id, title FROM roles";
db.promise()
  .query(sql)
  .then(([rows, _]) => {
    console.log("titles", rows); // array of objects
    for (var i = 0; i < rows.length; i++) {
      rowsArr = Object.values(rows[i]); // converts an obj to an array
      rolesArr.push(rowsArr[1]);
    }
    console.log("rolesArr", rolesArr);
    rolesObj = rows;
    console.log("rolesObj", rolesObj);

    let findIndex = rolesObj.findIndex(
      (values) => values.title === "Sales Lead"
    );
    let indexArr = rolesObj[findIndex];
    let roleId = indexArr.role_id;

    console.log(findIndex);
    console.log(indexArr);
    console.log(roleId);
  })
  .catch((err) => console.log(err));
