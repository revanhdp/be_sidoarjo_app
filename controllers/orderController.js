const { Order } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const { user_id, total_amount, payment_status, order_status } = req.body;
      const order = await Order.create({
        user_id,
        total_amount,
        payment_status,
        order_status
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { order_status } = req.body;
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ message: 'Not found' });

      order.order_status = order_status;
      await order.save();

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};