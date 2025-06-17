'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'full_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'address_detail', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'postal_code', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'shipping_method', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'shipping_cost', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Orders', 'service_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'service_cost', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'full_name');
    await queryInterface.removeColumn('Orders', 'phone_number');
    await queryInterface.removeColumn('Orders', 'address_detail');
    await queryInterface.removeColumn('Orders', 'city');
    await queryInterface.removeColumn('Orders', 'postal_code');
    await queryInterface.removeColumn('Orders', 'shipping_method');
    await queryInterface.removeColumn('Orders', 'shipping_cost');
    await queryInterface.removeColumn('Orders', 'service_name');
    await queryInterface.removeColumn('Orders', 'service_cost');
  }
};
