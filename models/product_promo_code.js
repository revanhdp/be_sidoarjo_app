'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductPromoCode = sequelize.define('ProductPromoCode', {
    product_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {
    tableName: 'product_promo_codes'
  });

  ProductPromoCode.associate = function(models) {
    ProductPromoCode.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return ProductPromoCode;
};
