const { Product, ProductVariant, ProductSize, ProductImg, ProductCategory } = require('../models');

module.exports = {
  // Get all products with variants and sizes
  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        include: ['variants', 'sizes', 'images', 'category']
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single product
  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: ['variants', 'sizes', 'images', 'category']
      });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getByCategory(req, res) {
    try {
      const { id } = req.params;

      const products = await Product.findAll({
        where: { category_id: id },
        include: [
          { model: ProductCategory, as: 'category' },
          { model: ProductImg, as: 'images' },
          { model: ProductVariant, as: 'variants' },
          { model: ProductSize, as: 'sizes' },
        ],
      });

      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Failed to get products by category", error: err.message });
    }
  },

  // Create a product
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a product
  async update(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await product.update(req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a product
  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await product.destroy();
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
