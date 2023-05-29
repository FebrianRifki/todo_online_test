const mysql = require('mysql2/promise');
const dbConfig = require("../config/db_config");

//create a connection to the database
const connection = mysql.createPool({
    host: dbConfig.HOST || 'localhost',
    user: dbConfig.USER || 'root',
    database: dbConfig.DB || 'hello',
    password: dbConfig.PASSWORD || 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// migrasi database
const migration = async () => {
    try {
        // Migrasi tabel activities
        await connection.query(`
            CREATE TABLE IF NOT EXISTS activities (
                activity_id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at DATETIME NOT NULL,
                PRIMARY KEY (activity_id)
            )
        `);

        // Migrasi tabel todos
        await connection.query(`
            CREATE TABLE IF NOT EXISTS todos (
                todo_id INT NOT NULL AUTO_INCREMENT,
                activity_group_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                priority VARCHAR(255) NOT NULL,
                is_active BOOLEAN NOT NULL,
                created_at DATETIME NOT NULL,
                PRIMARY KEY (todo_id)
            )
        `);

        console.log('Running Migration Successfully!');
    } catch (err) {
        throw err;
    }
};


module.exports = { connection, migration };