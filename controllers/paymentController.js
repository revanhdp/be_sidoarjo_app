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
      const { order_id, payment_method_id, payment_method_name, amount, status } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'Payment proof is required' });
      }

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized: User not found in token' });
      }

      const payment = await Payment.create({
        order_id,
        user_id: req.user.id,
        payment_method_id,
        payment_method_name,
        amount,
        status,
        payment_proof: req.file.path, // dari Cloudinary
      });

      res.status(201).json({
        success: true,
        message: 'Payment created successfully',
        data: payment,
      });
    } catch (error) {
      console.error('❌ Error creating payment:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create payment',
      });
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
