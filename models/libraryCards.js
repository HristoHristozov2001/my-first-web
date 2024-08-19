const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const LibraryCards = sequelize.define('LibraryCards', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        issueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        memberId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Member',
                key: 'id'
            }
        }
    });

    LibraryCards.associate = (models) => {
        LibraryCards.belongsTo(models.Members, {
            foreignKey: 'memberId',
            as: 'member'
        });
    }

    return LibraryCards;
}