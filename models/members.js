module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define('Members', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        libraryCardId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'LibraryCards',
                key: 'id'
            },
            allowNull: false
        }
    });

    Members.associate = (models) => {
        Members.hasOne(models.LibraryCards, {
            foreignKey: 'libraryCardId',
            as: 'libraryCard'
        });
    }

    return Members;
}