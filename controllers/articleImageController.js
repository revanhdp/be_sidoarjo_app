const { ArticleImg } = require('../models');

module.exports = {
  async upload(req, res) {
    try {
      const article_id = req.params.article_id;
      const files = req.files; // array of images

      if (!files || files.length !== 3) {
        return res.status(400).json({ message: 'Harus upload 3 gambar: 1 utama, 2 fitur' });
      }

      const result = [];

      // Gambar pertama sebagai utama (is_feature = false)
      result.push(await ArticleImg.create({
        article_id,
        img_url: files[0].path,
        is_feature: false,
      }));

      // Gambar kedua dan ketiga sebagai fitur
      for (let i = 1; i < 3; i++) {
        result.push(await ArticleImg.create({
          article_id,
          img_url: files[i].path,
          is_feature: true,
        }));
      }

      res.status(201).json(result);
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
