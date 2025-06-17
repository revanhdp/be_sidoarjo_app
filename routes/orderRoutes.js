const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const orderItemController = require('../controllers/orderItemController')
const authenticate = require('../middlewares/authMiddleware');

router.get('/', orderController.getAll);
router.get('/my-orders', authenticate, orderItemController.getMyOrders);
router.post('/', orderController.create);
router.patch('/:id', orderController.updateStatus);

router.get('/item', orderItemController.getAll);
router.post('/item', orderItemController.create);
router.patch('/item/:id', orderItemController.update);
router.delete('/item/:id', orderItemController.delete);

module.exports = router;
