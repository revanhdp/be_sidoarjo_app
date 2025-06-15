'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define('ProductVariant', {
    name: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    tableName: 'product_variants'
  });

  ProductVariant.associate = function(models) {
    ProductVariant.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return ProductVariant;
};
