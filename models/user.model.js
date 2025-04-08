const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'User',
  },
);