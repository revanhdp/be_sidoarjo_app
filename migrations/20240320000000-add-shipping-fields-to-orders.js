'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambahkan kolom timestamps jika belum ada
    const tableInfo = await queryInterface.describeTable('orders');
    
    if (!tableInfo.created_at) {
      await queryInterface.addColumn('orders', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }
    
    if (!tableInfo.updated_at) {
      await queryInterface.addColumn('orders', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }

    // Tambahkan kolom lainnya
    await queryInterface.addColumn('orders', 'full_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'address_detail', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'postal_code', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'shipping_method', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'shipping_cost', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
    await queryInterface.addColumn('orders', 'service_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'service_cost', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
    await queryInterface.addColumn('orders', 'status', {
      type: Sequelize.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'full_name');
    await queryInterface.removeColumn('orders', 'phone_number');
    await queryInterface.removeColumn('orders', 'address_detail');
    await queryInterface.removeColumn('orders', 'city');
    await queryInterface.removeColumn('orders', 'postal_code');
    await queryInterface.removeColumn('orders', 'shipping_method');
    await queryInterface.removeColumn('orders', 'shipping_cost');
    await queryInterface.removeColumn('orders', 'service_name');
    await queryInterface.removeColumn('orders', 'service_cost');
    await queryInterface.removeColumn('orders', 'status');
    await queryInterface.removeColumn('orders', 'created_at');
    await queryInterface.removeColumn('orders', 'updated_at');
  }
}; 