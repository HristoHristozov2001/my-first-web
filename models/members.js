module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define('Members', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumbers: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        libraryCardId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'LibraryCards',
                key: 'id'
            }
        } 
    });

    Members.associate = (models) => {
        Members.hasOne(models.LibraryCards, {
            foreignKey: 'memberId',
            as: 'libraryCard'
        });
    }

    return Members; 
}