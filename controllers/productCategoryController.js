const { ProductCategory } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const categories = await ProductCategory.findAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      const category = await ProductCategory.create({ name });
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
