module.exports = (sequelize, DataTypes) => {
    const Publishers = sequelize.define('Publishers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Publishers.associate = (models) => {
        Publishers.hasMany(models.Books, {
            foreignKey: 'publisherId',
            as: 'books'
        });
    }

    return Publishers;
}