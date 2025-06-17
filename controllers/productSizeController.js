const { ProductSize } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      console.log("Body:", req.body);
      const size = await ProductSize.create(req.body);
      res.status(201).json(size);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  async getByProduct(req, res) {
    try {
        const sizes = await ProductSize.findAll({
        where: { product_id: req.params.productId }
        });
        res.json(sizes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},

  async update(req, res) {
    try {
      const updated = await ProductSize.update(req.body, { where: { id: req.params.id } });
      if (!updated[0]) return res.status(404).json({ message: 'Size not found' });
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ProductSize.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ message: 'Size not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
