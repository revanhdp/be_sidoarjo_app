'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    address_detail: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ''
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    shipping_method: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    shipping_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    service_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true
  });

  Order.associate = function(models) {
    Order.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user'
    });

    Order.hasMany(models.Payment, {
      foreignKey: 'order_id',
      as: 'payments'
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'items'
    });
  };

  return Order;
};