const { ArticleComment } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { user_id, article_id, comment } = req.body;
      const newComment = await ArticleComment.create({ user_id, article_id, comment });
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getByArticle(req, res) {
    try {
      const comments = await ArticleComment.findAll({
        where: { article_id: req.params.article_id }
      });
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
