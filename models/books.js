module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('Books',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ISBN:{
            type: DataTypes.STRING,
            allowNull: false,
            uniqe: true
        },
        authorId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Authors',
                key: 'id'
            }
        },
        publisherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Publishers',
                key: 'id'
            }
        },
        publicationYear: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Genres',
                key: 'id'
            }
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
}