module.exports = (sequelize, DataTypes) => {
    const Computer = sequelize.define('Computer', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      processor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ram: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gpu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    
    return Computer;
  };
  