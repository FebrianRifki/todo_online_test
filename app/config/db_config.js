require('dotenv').config();

let envConfig;

// Check if running in Docker environment
if (process.env.MYSQL_HOST && process.env.MYSQL_PORT && process.env.MYSQL_USER && process.env.MYSQL_PASSWORD && process.env.MYSQL_DBNAME) {
    envConfig = {
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: process.env.MYSQL_PORT,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DBNAME: process.env.MYSQL_DBNAME
    };
} else {
    envConfig = {
        MYSQL_HOST: process.env.HOST,
        MYSQL_PORT: process.env.PORT,
        MYSQL_USER: process.env.USER,
        MYSQL_PASSWORD: process.env.PASSWORD,
        MYSQL_DBNAME: process.env.MYSQL_DBNAME
    };
}

module.exports = {
    HOST: envConfig.MYSQL_HOST,
    PORT: envConfig.MYSQL_PORT,
    USER: envConfig.MYSQL_USER,
    PASSWORD: envConfig.MYSQL_PASSWORD,
    DB: envConfig.MYSQL_DBNAME
};