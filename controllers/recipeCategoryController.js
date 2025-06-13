const { recipe_category, recipe } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const data = await recipe_category.findAll({ include: [recipe] });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await recipe_category.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};