const { Sequelize } = require('sequelize');
const dbCredentials = require('./dbCredentials');

const sequelize = new Sequelize(dbCredentials.database, dbCredentials.user, dbCredentials.password, {
  host: dbCredentials.host,
  dialect: 'mysql'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };