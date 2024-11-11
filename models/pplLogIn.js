const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    const People = sequelize.define('People', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: false,

        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        },
        twoFactorEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        twoFactorSecret: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        formConfirmCode: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },{
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });

    People.associate = (models) =>{
        People.hasOne(models.ForgetPassword, {
            foreignKey: 'personId',
            as: 'forgetPassword'
        });
    }

    return People;
}