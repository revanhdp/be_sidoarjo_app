'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define('PaymentMethod', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'payment_methods',
    underscored: true
  });

  PaymentMethod.associate = function(models) {
    PaymentMethod.hasMany(models.Payment, {
      foreignKey: 'payment_method_id',
      as: 'payments'
    });
  };

  return PaymentMethod;
};
