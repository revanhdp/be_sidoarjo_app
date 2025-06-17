'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'status', {
      type: Sequelize.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'status');
  }
};