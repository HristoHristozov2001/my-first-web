module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('Books', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        publicationYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Authors',
                key: 'id'
            },
            allowNull: false
        },
        publisherId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Publishers',
                key: 'id'
            },
            allowNull: false
        },
        genreId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Genres',
                key: 'id'
            },
            allowNull: false
        }

    });

    Books.associate = (models) => {
        Books.belongsTo(models.Authors, {
            foreignKey: 'authorId',
            as: 'author'
        });

        Books.belongsTo(models.Publishers, {
            foreignKey: 'publisherId',
            as: 'publisher'
        });

        Books.belongsTo(models.Genres, {
            foreignKey: 'genreId',
            as: 'genre'
        });
    }

    return Books;
};
