'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'user_id');
  }
};
