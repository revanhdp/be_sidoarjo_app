'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define('ProductReview', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'product_reviews',
    timestamps: true
  });

  ProductReview.associate = function(models) {
    ProductReview.belongsTo(models.Product, { 
      foreignKey: 'product_id',
      as: 'Product',
      onDelete: 'CASCADE'
    });
    ProductReview.belongsTo(models.Users, { 
      foreignKey: 'user_id',
      as: 'User',
      onDelete: 'CASCADE'
    });
  };

  return ProductReview;
};