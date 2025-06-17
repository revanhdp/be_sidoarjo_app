const { OrderItem, Order, Product, ProductImg, Payment } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const items = await OrderItem.findAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
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
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              include: [
                {
                  model: ProductImg,
                  as: 'images'
                }
              ]
            }
          ]
        },
        {
          model: Payment,
          as: 'payments',
          attributes: [
            ['status', 'payment_status'], // alias status jadi payment_status
            'payment_method_id'
          ]
        }
      ]
    });

    res.json(orders);
  } catch (error) {
    console.error('Error in getMyOrders:', error);
    res.status(500).json({ message: 'Gagal mengambil data pesanan', error: error.message });
  }
},

  async update(req, res) {
    try {
      const item = await OrderItem.findByPk(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });

      const { quantity, price } = req.body;
      item.quantity = quantity;
      item.price = price;
      item.total_price = quantity * price;
      await item.save();

      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const item = await OrderItem.findByPk(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });

      await item.destroy();
      res.json({ message: 'Order item deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      console.log('Received order items data:', req.body);

      // Normalisasi ke array
      const items = Array.isArray(req.body) ? req.body : [req.body];

      // Daftar field yang diizinkan
      const allowedFields = ['order_id', 'product_id', 'quantity', 'price', 'total_price'];

      // Bersihkan item agar hanya field yang valid
      const cleanedItems = items.map(item => {
        const cleaned = {};
        for (let key of allowedFields) {
          if (item[key] === undefined || item[key] === null) {
            throw new Error(`Missing required field: ${key}`);
          }
          cleaned[key] = item[key];
        }
        return cleaned;
      });

      // Insert ke DB
      const createdItems = await OrderItem.bulkCreate(cleanedItems);

      console.log('Created order items:', createdItems);
      res.status(201).json(createdItems);

    } catch (err) {
      console.error('Error creating order items:', err);
      res.status(500).json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  }
};
