const { sequelize, Article, CategoryArticle, ArticleImg, Users } = require('../models');

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

  async getAllCategory(req, res) {
    try {
      const categories = await CategoryArticle.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error getting categories:", error);
      res.status(500).json({ message: error.message });
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
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { title, desc, slug, category_id, data_article } = req.body;

      const article = await Article.findByPk(id);
      if (!article) return res.status(404).json({ message: 'Artikel tidak ditemukan' });

      await article.update({ title, desc, slug, category_id, data_article }, { transaction: t });

      await t.commit();
      res.status(200).json({ message: 'Artikel berhasil diperbarui', article });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui artikel', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Article.destroy({ where: { id: req.params.id } });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createFullArticle(req, res) {
    const t = await sequelize.transaction();
    try {
      const { title, desc, slug, category_id, data_article } = req.body;
      const files = req.files;

      if (!files || files.length !== 3) {
        return res.status(400).json({ message: 'Harus upload 3 gambar: 1 utama, 2 fitur' });
      }

      // 1. Buat artikel
      const article = await Article.create({
        title,
        desc,
        slug,
        category_id,
        data_article,
      }, { transaction: t });

      const article_id = article.id;

      // 2. Upload gambar
      await ArticleImg.create({
        article_id,
        img_url: files[0].path,
        is_feature: false,
      }, { transaction: t });

      for (let i = 1; i < 3; i++) {
        await ArticleImg.create({
          article_id,
          img_url: files[i].path,
          is_feature: true,
        }, { transaction: t });
      }

      await t.commit();
      res.status(201).json({ message: 'Artikel dan gambar berhasil dibuat', article });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: 'Gagal membuat artikel', error: error.message });
    }
  }
};
