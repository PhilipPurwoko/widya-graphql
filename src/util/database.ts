import mysql from 'mysql2/promise'
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from './env'

export default mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
})