'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // product table
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.STRING, allowNull: false },
      stock: { type: Sequelize.INTEGER, allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      sold: { type: Sequelize.INTEGER, allowNull: true },
      slug: { type: Sequelize.STRING, allowNull: true },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // product_img table
    await queryInterface.createTable('product_imgs', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      img_url: { type: Sequelize.STRING },
      product_id: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      is_featured: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // product_review table
    await queryInterface.createTable('product_reviews', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      comment: { type: Sequelize.STRING },
      product_id: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      rating: { type: Sequelize.BOOLEAN },
      user_id: { type: Sequelize.INTEGER },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // product_variant table
    await queryInterface.createTable('product_variants', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: Sequelize.STRING },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // product_size table
    await queryInterface.createTable('product_sizes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: Sequelize.STRING },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // product_cart table
    await queryInterface.createTable('product_carts', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      user_id: { type: Sequelize.INTEGER },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // product_promo_code table
    await queryInterface.createTable('product_promo_codes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      code: { type: Sequelize.INTEGER },
      discount: { type: Sequelize.INTEGER },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_promo_codes');
    await queryInterface.dropTable('product_carts');
    await queryInterface.dropTable('product_sizes');
    await queryInterface.dropTable('product_variants');
    await queryInterface.dropTable('product_reviews');
    await queryInterface.dropTable('product_imgs');
    await queryInterface.dropTable('products');
  }
};