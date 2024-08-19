module.exports = (sequelize, DataTypes) => {
    const Genres = sequelize.define('Genres', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        genreName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Genres.associate = (models) => {
        Genres.hasMany(models.Books, {
            foreignKey: 'genreId',
            as: 'books'
        });
    }

    return Genres; 
}