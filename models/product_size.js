'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
    
  }, {
    tableName: 'product_sizes'
  });

  ProductSize.associate = function(models) {
    ProductSize.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return ProductSize;
};
