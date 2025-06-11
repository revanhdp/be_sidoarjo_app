const { CategoryArticle } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const data = await CategoryArticle.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      const category = await CategoryArticle.create({ name });
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
