'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImg = sequelize.define('ProductImg', {
    img_url: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    is_featured: DataTypes.BOOLEAN
  }, {
    tableName: 'product_imgs'
  });

  ProductImg.associate = function(models) {
    ProductImg.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return ProductImg;
};
