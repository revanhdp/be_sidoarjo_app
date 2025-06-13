const { recipe_favorite, recipe, users } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const data = await recipe_favorite.findAll({
        include: [recipe, users]
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await recipe_favorite.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
