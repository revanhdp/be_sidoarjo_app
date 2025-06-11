const { FavoriteArticle } = require('../models');

module.exports = {
  async addFavorite(req, res) {
    try {
      const { user_id, article_id } = req.body;
      const fav = await FavoriteArticle.create({ user_id, article_id });
      res.status(201).json(fav);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async removeFavorite(req, res) {
    try {
      const { user_id, article_id } = req.body;
      await FavoriteArticle.destroy({ where: { user_id, article_id } });
      res.json({ message: 'Removed' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
