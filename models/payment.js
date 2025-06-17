'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payment_method_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payment_proof: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Menunggu Konfirmasi', 'Accepted', 'Rejected'),
      defaultValue: 'Menunggu Konfirmasi'
    },
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'payments',
    underscored: true
  });

  Payment.associate = function(models) {
    Payment.belongsTo(models.PaymentMethod, {
      foreignKey: 'payment_method_id',
      as: 'payment_method'
    });

    Payment.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    Payment.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  };

  return Payment;
};
