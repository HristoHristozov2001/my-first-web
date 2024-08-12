const mysql = require('mysql2/promise');
const dbCredentials = require('../config/dbCredentials');
const pool = mysql.createPool(dbCredentials);

module.exports = pool;