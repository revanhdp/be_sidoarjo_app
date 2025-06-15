'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    img_url: DataTypes.STRING,
    address: DataTypes.STRING,
    interest: DataTypes.STRING,
    favorite: DataTypes.STRING,
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'Users',
    timestamps: false // tambahkan jika tabel tidak memakai createdAt/updatedAt
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Roles, {
      foreignKey: 'role_id',
      as: 'role'
    });

  

    // Jika ada hubungan dengan Article:
    // Users.hasMany(models.Article, {
    //   foreignKey: 'user_id',
    //   as: 'articles'
    // });
  };

  return Users;
};
