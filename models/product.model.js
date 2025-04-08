const { DataTypes, Model } = require('sequelize');

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
    category: DataTypes.ENUM("electronics","jewelery","men's clothing","women's clothing"),
    ratingRate: DataTypes.FLOAT,
    ratingCount: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Product',
  },
);

module.exports = Product