const {Sequelize} = require('sequelize');
const dbCredentials = require('./dbCredentials');

const sequelize = new Sequelize(dbCredentials.database, dbCredentials.user, dbCredentials.password, {
    dialect: 'mysql',
    host: dbCredentials.host
});

const connectDB = async () =>{
    try {
        await sequelize.authenticate();
        console.log('DataBase connection established!');
    } catch (error) {
        console.log('DataBase connection not established!');
    } 
};

module.exports = {sequelize, connectDB};
