module.exports = (sequelize, DataTypes) => {
    const Borrowings = sequelize.define('Borrowings', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Members',
                key: 'id'
            }
        },
        bookId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Books',
                key: 'id'
            }
        },
        borrowDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

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