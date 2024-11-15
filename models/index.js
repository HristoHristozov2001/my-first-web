const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/dbConnection');
const indexName = path.basename(__filename);
const models = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') != 0) && (file != indexName) && (file.slice(-3) == '.js')
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, require('sequelize').DataTypes);
        models[model.name] = model;
    })

Object.keys(models)
    .forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });

const syncDB = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

module.exports = { models, syncDB };