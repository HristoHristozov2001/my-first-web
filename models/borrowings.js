module.exports = (sequelize, DataTypes) => {
    const Borrowings = sequelize.define('Borrowings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        memberId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Members', 
                key: 'id'
            },
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Books', 
                key: 'id'
            },
            allowNull: false
        },
        borrowDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true  
        }
    });

    Borrowings.associate = (models) => {
        Borrowings.belongsTo(models.Members, {
            foreignKey: 'memberId',
            as: 'member'
        });

        Borrowings.belongsTo(models.Books, {
            foreignKey: 'bookId',
            as: 'book'
        });
    }

    return Borrowings;
}