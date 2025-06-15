const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productVariantController = require('../controllers/productVariantController');
const productSizeController = require('../controllers/productSizeController');
const productImgController = require('../controllers/productImgController');
const productCategoryController = require('../controllers/productCategoryController');
const upload = require('../middlewares/cloudinaryStorageProduct')

// Product routes
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.get('/category/:id', productController.getByCategory);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

// Variant routes
router.get('/products/:productId/variants', productVariantController.getByProduct);
router.post('/products/variants', productVariantController.create);
router.put('/variants/:id', productVariantController.update);
router.delete('/variants/:id', productVariantController.delete);

// Size routes
router.get('/products/:productId/sizes', productSizeController.getByProduct);
router.post('/products/sizes', productSizeController.create);
router.put('/sizes/:id', productSizeController.update);
router.delete('/sizes/:id', productSizeController.delete);

// Images routes
router.get('/:productId/images', productImgController.getByProduct);
router.get('/images', productImgController.getAll);
router.post('/images', upload.array('images', 5), productImgController.create);
router.delete('/images/:id', productImgController.delete);

// Category Routes
router.get('/categories', productCategoryController.getAll);
router.post('/categories', productCategoryController.create);

module.exports = router;
