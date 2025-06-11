'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      img_url: Sequelize.STRING,
      address: Sequelize.STRING,
      interest: Sequelize.STRING,
      favorite: Sequelize.STRING,
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles', // sesuai dengan nama tabel di Role
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
