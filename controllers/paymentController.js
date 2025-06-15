const { Payment } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const payments = await Payment.findAll();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const { user_id, order_id, payment_method_id, payment_proof } = req.body;
      const payment = await Payment.create({
        user_id,
        order_id,
        payment_method_id,
        payment_proof,
        status: 'pending',
        confirmed_at: null
      });
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) return res.status(404).json({ message: 'Not found' });

      payment.status = status;
      payment.confirmed_at = new Date();
      await payment.save();

      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
