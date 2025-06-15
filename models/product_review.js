'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define('ProductReview', {
    comment: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    rating: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    tableName: 'product_reviews'
  });

  ProductReview.associate = function(models) {
    ProductReview.belongsTo(models.Product, { foreignKey: 'product_id' });
    ProductReview.belongsTo(models.Users, { foreignKey: 'user_id' });
  };

  return ProductReview;
};
