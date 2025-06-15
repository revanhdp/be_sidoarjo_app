const { PaymentMethod } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const methods = await PaymentMethod.findAll();
      res.json(methods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name, code, logo_url } = req.body;
      const method = await PaymentMethod.create({ name, code, logo_url });
      res.status(201).json(method);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await PaymentMethod.destroy({ where: { id: req.params.id } });
      res.json({ message: 'Deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};