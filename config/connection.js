// Reference: 12-SQL > 11-Ins_Connect-Node
// Reference: 12-ORM > 13-Ins_Validation 

const mysql = require('mysql2'); 
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "company_db",
    },
    console.log("Connected to the company_db database")
  );

// Connect to database
// const db = mysql.createConnection(
// 	{
// 		host: 'localhost', 
// 		user: process.env.DB_NAME,
// 		password: process.env.DB_PASSWORD,
// 		database: process.env.DB_NAME
// 	}
// 	// console.log('Connected to the company_db database.')
// )

module.exports = db;