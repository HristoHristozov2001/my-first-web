module.exports = (sequelize, DataTypes) => {
    const Authors = sequelize.define('Authors', {
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
        biography: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Authors.associate = (models) => {
        Authors.hasMany(models.Books, {
            foreignKey: 'authorId',
            as: 'books'
        });
    }

    return Authors;
}