import mysql from 'mysql2/promise'

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '1234',
    database: 'safetrack'
})

console.log('--> DB conectado <--');
export default con;