const { Order, OrderItem, sequelize } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  // Ambil semua pesanan dengan item-itemnya
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: ['items']
      });
      res.json(orders);
    } catch (error) {
      console.error('Error in getAll orders:', error);
      res.status(500).json({ message: error.message });
    }
  },

  async getMyOrders(req, res) {
  try {
      const userId = req.user.id;

      const orders = await Order.findAll({
        where: { user_id: userId },
        include: [
          {
            model: OrderItem,
            include: [Product]
          },
          {
            model: Payment,
            attributes: ['payment_method', 'payment_status']
          }
        ]
      });

      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil data pesanan', error: error.message });
    }
  },

  // Membuat pesanan baru
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log('Request cookies:', req.cookies);
      
      // Ambil user_id dari cookies/token
      const token = req.cookies.access_token; 
      
      if (!token) {
        return res.status(401).json({ message: 'No authentication token provided' });
      }
      
      console.log('Token found:', token);
      
      // Verify dan decode JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      
      const user_id = decoded.id || decoded.userId; // sesuaikan dengan struktur token Anda

      if (!user_id) {
        return res.status(401).json({ message: 'Invalid token structure' });
      }

      console.log('User ID from token:', user_id);

      const {
        total_price,
        full_name,
        phone_number,
        address_detail,
        city,
        postal_code,
        shipping_method,
        shipping_cost,
        service_name,
        service_cost
      } = req.body;

      // Validasi
      if (!total_price) {
        throw new Error('Total price is required');
      }

      const orderData = {
        total_price,
        full_name: full_name || '',
        phone_number: phone_number || '',
        address_detail: address_detail || '',
        city: city || '',
        postal_code: postal_code || '',
        shipping_method: shipping_method || '',
        shipping_cost: shipping_cost || 0,
        service_name: service_name || '',
        service_cost: service_cost || 0,
        user_id, // Dari token
        status: 'pending'
      };

      console.log('Creating order with data:', orderData);

      const order = await Order.create(orderData, { transaction: t });
      
      await t.commit();
      res.status(201).json({
        message: 'Order created successfully',
        order_id: order.id,
        total_price,
        order
      });
      
    } catch (error) {
      await t.rollback();
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired', code: 'TOKEN_EXPIRED' });
      }

      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token', code: 'INVALID_TOKEN' });
      }
      
      console.error('Error in create order:', error);
      res.status(500).json({ 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  // Update status pesanan
  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      order.status = status;
      await order.save();

      res.json(order);
    } catch (error) {
      console.error('Error in updateStatus:', error);
      res.status(500).json({ message: error.message });
    }
  }
};
