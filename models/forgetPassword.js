module.exports=(sequelize, DataTypes) => {
    const ForgetPassword = sequelize.define('ForgetPassword', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        personId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'People',
                key: 'id'
            }
        }
    });

    ForgetPassword.associate = (models) => {
        ForgetPassword.belongsTo(models.People, {
            foreignKey: 'personId',
            as: 'people'
        });
    }

    return ForgetPassword;
}