'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    sold: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {
    tableName: 'products'
  });

  Product.associate = function(models) {
    Product.hasMany(models.ProductImg, { foreignKey: 'product_id', as: 'images' });
    Product.hasMany(models.ProductReview, { foreignKey: 'product_id', as: 'reviews' });
    Product.hasMany(models.ProductVariant, { foreignKey: 'product_id', as: 'variants' });
    Product.hasMany(models.ProductSize, { foreignKey: 'product_id', as: 'sizes' });
    Product.hasMany(models.ProductCart, { foreignKey: 'product_id', as: 'carts' });
    Product.belongsTo(models.ProductCategory, { foreignKey: 'category_id', as: 'category' });
    Product.hasOne(models.ProductPromoCode, { foreignKey: 'product_id', as: 'promo' });
    Product.hasMany(models.OrderItem, {
    foreignKey: 'product_id',
    as: 'orderItems'
  });
  };

  return Product;
};
