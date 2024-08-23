const { configDotenv } = require("dotenv")

configDotenv();

module.exports = {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_SCHEMA,
    "host": process.env.DB_HOST,
    "port": 3306,
    "dialect": "mysql" 
}