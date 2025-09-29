const mysql = require('mysql');
const ulti = require('util'); //peticiones asincronas

// Configuración de la conexión a la base de datos

const pool = mysql.createPool({
    connectionLimit: 10,
    host:'localhost',
    user:'root',
    password: '',
    database: 'pokemon'
});

pool.query = ulti.promisify(pool.query); //promisify para hacer las peticiones asincronas
module.exports = pool;