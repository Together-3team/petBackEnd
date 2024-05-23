import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    database: process.env.DB_DATABASE || '',
    port: 3306
})

connection.connect()
module.exports = connection