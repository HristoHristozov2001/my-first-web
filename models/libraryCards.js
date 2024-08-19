module.exports = (sequelize, DataTypes) => {
    const LibraryCards = sequelize.define('LibraryCards', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        issueDate: {
            type: DataTypes.DATE,
            allowNull: false,

        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Members',
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