const { ArticleImg } = require('../models');

module.exports = {
  async upload(req, res) {
    try {
      const { article_id, img_url, is_feature } = req.body;
      const image = await ArticleImg.create({ article_id, img_url, is_feature });
      res.status(201).json(image);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await ArticleImg.destroy({ where: { id: req.params.id } });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
