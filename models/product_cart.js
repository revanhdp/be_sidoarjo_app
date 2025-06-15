'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCart = sequelize.define('ProductCart', {
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    tableName: 'product_carts'
  });

ProductCart.associate = function (models) {
  ProductCart.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product'
  });
  ProductCart.belongsTo(models.Users, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

  return ProductCart;
};
