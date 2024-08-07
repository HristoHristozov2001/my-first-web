const mysql = require('mysql2/promise');
const dbCredentials = require('./dbCredentials');
const pool = mysql.createPool(dbCredentials);

module.exports = pool;