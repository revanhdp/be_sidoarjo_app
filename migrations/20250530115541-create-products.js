'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // product
    await queryInterface.createTable('product', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING, unique: true },
      price: { type: Sequelize.STRING },
      stock: { type: Sequelize.INTEGER },
      description: { type: Sequelize.TEXT },
      sold: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_img
    await queryInterface.createTable('product_img', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      img_url: { type: Sequelize.STRING },
      product_id: { type: Sequelize.INTEGER, references: { model: 'product', key: 'id' }, onDelete: 'CASCADE' },
      is_featured: { type: Sequelize.BOOLEAN },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_review
    await queryInterface.createTable('product_review', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      comment: { type: Sequelize.STRING },
      product_id: { type: Sequelize.INTEGER, references: { model: 'product', key: 'id' }, onDelete: 'CASCADE' },
      rating: { type: Sequelize.BOOLEAN },
      user_id: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_cart
    await queryInterface.createTable('product_cart', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: { type: Sequelize.STRING },
      user_id: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_promo_code
    await queryInterface.createTable('product_promo_code', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: { type: Sequelize.STRING },
      code: { type: Sequelize.STRING },
      discount: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_variant
    await queryInterface.createTable('product_variant', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_variant_bridge
    await queryInterface.createTable('product_variant_bridge', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: { type: Sequelize.STRING },
      variant_id: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_size
    await queryInterface.createTable('product_size', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // product_size_bridge
    await queryInterface.createTable('product_size_bridge', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: { type: Sequelize.STRING },
      size_id: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_size_bridge');
    await queryInterface.dropTable('product_size');
    await queryInterface.dropTable('product_variant_bridge');
    await queryInterface.dropTable('product_variant');
    await queryInterface.dropTable('product_promo_code');
    await queryInterface.dropTable('product_cart');
    await queryInterface.dropTable('product_review');
    await queryInterface.dropTable('product_img');
    await queryInterface.dropTable('product');
  }
};
