const { ProductVariant } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const variant = await ProductVariant.create(req.body);
      res.status(201).json(variant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getByProduct(req, res) {
    try {
        const variants = await ProductVariant.findAll({
        where: { product_id: req.params.productId }
        });
        res.json(variants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    },

  async update(req, res) {
    try {
      const updated = await ProductVariant.update(req.body, { where: { id: req.params.id } });
      if (!updated[0]) return res.status(404).json({ message: 'Variant not found' });
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ProductVariant.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ message: 'Variant not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
