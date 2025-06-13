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

  async getMyFavorites(req, res) {
    try {
      const user_id = req.user.id;

      const data = await recipe_favorite.findAll({
        where: { user_id },
        include: [recipe]
      });

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const user_id = req.user.id;
      const { recipe_id } = req.body;

      const exists = await recipe_favorite.findOne({
        where: { user_id, recipe_id }
      });

      if (exists) {
        return res.status(409).json({ message: 'Already favorited' });
      }

      const favorite = await recipe_favorite.create({ user_id, recipe_id });
      res.status(201).json({
        message: 'Added to favorites',
        data: favorite
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async remove(req, res) {
    try {
      const user_id = req.user.id;
      const { recipe_id } = req.body;

      const deleted = await recipe_favorite.destroy({
        where: { user_id, recipe_id }
      });

      if (deleted === 0) {
        return res.status(404).json({ message: 'Favorite not found' });
      }

      res.json({ message: 'Removed from favorites' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
