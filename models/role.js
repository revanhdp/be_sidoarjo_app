'use strict';

module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Roles',
    timestamps: false 
  });

  Roles.associate = (models) => {
    Roles.hasMany(models.Users, {
      foreignKey: 'role_id',
      as: 'users'
    });
  };

  return Roles;
};