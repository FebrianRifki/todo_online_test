const mysql = require("mysql2");
const dbConfig = require("../config/db_config");

//create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    connectTimeout: 30000

})

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database');
})

module.exports = connection;