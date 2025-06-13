const express = require('express');
const router = express.Router();
const recipeFavoriteController = require('../controllers/recipeFavoriteController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', recipeFavoriteController.getAll);
router.get('/me', authenticate, recipeFavoriteController.getMyFavorites);
router.post('/', authenticate, recipeFavoriteController.create);
router.delete('/', authenticate, recipeFavoriteController.remove);

module.exports = router;

