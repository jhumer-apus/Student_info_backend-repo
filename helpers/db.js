//connecting to database
const mysql = require('mysql2');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'student'
});

module.exports = db;