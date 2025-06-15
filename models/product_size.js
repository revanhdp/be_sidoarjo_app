'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    name: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    tableName: 'product_sizes'
  });

  ProductSize.associate = function(models) {
    ProductSize.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return ProductSize;
};
