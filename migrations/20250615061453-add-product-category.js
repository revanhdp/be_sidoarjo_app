'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Buat tabel category
    await queryInterface.createTable('ProductCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });

    // Tambahkan kolom category_id ke Product
    await queryInterface.addColumn('Products', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'ProductCategories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'category_id');
    await queryInterface.dropTable('ProductCategories');
  }
};
