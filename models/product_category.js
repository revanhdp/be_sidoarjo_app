'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.hasMany(models.Product, { foreignKey: 'category_id' });
    }
  }
  ProductCategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ProductCategory',
    }
  );
  return ProductCategory;
};
