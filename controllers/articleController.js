const { Article, CategoryArticle, ArticleImg, Users } = require('../models');

module.exports = {
    // Mengambil semua article
  async getAll(req, res) {
    try {
      const articles = await Article.findAll({
        include: ['category', 'images', 'author']
      });
      res.json(articles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const article = await Article.findByPk(req.params.id, {
        include: ['category', 'images', 'author']
      });
      if (!article) return res.status(404).json({ message: 'Not Found' });
      res.json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getByCategory(req, res) {
    try {
        const { categoryId } = req.params;

        const articles = await Article.findAll({
        where: { category_id: categoryId },
        include: ['category', 'images', 'author']
        });

        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { title, desc, slug, category_id, data_article } = req.body;
      const article = await Article.create({ title, desc, slug, category_id, data_article });
      res.status(201).json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await Article.update(req.body, { where: { id: req.params.id } });
      res.json({ message: 'Updated', updated });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Article.destroy({ where: { id: req.params.id } });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
