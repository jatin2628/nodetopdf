'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Image,{
        through:'Product_Image',
        foreignKey:'product_id',
        onDelete:'CASCADE'
      })

      Product.belongsTo(models.User,{
        foreignKey:'user_id',
        onDelete:'CASCADE'
      })
    }
  }
  Product.init({
    product_name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};