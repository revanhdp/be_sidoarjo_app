const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/cloudinaryStorage')

// Public Routes
router.get('/', recipeController.getAll);
router.get('/categories', recipeController.getAllCategory)
router.get('/category/:categoryId', recipeController.getByCategory);
router.get('/:id', recipeController.getById);

// Admin Router
router.post('/', isAdmin, upload.single('img_url'), recipeController.create);
router.put('/:id', isAdmin, recipeController.update);
router.delete('/:id', isAdmin, recipeController.delete);

module.exports = router;

