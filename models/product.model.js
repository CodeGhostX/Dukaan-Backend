const { DataTypes, Model } = require("sequelize");
const sequelize = require('../db/index.js');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.ENUM(
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing"
    ),
    ratingRate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

module.exports = Product;
