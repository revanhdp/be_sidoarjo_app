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
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
      defaultValue: 'pending'
    },
    payment_status: {
      type: DataTypes.ENUM('unpaid', 'waiting', 'paid', 'rejected'),
      defaultValue: 'unpaid'
    }
  }, {
    tableName: 'orders',
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
  };

  return Order;
};
