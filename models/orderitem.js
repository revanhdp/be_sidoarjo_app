'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // OrderItem belongs to one Order
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order'
      });

      // OrderItem belongs to one Product
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }

  OrderItem.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderitems',
    timestamps: true,
    underscored: true
  });

  return OrderItem;
};
