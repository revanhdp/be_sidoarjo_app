const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const paymentMethodController = require('../controllers/paymentMethodController');
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/cloudinaryStoragePayment')

// Payment Routes
router.get('/payments', paymentController.getAll);
router.post('/payments', authenticate, upload.single('payment_proof'), paymentController.create);
router.patch('/payments/:id', paymentController.updateStatus);

// Payment Method Routes
router.get('/payment-methods', paymentMethodController.getAll);
router.get('/payment-methods/:id', paymentMethodController.getById);
router.post('/payment-methods', paymentMethodController.create);
router.delete('/payment-methods/:id', paymentMethodController.delete);

module.exports = router;
