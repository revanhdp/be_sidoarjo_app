const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleController')
const isAdmin = require('../middlewares/isAdmin');

router.get('/', articleController.getAll);
router.get('/:id', articleController.getById);
router.post('/', isAdmin, articleController.create);
router.put('/:id', isAdmin, articleController.update);
router.delete('/:id', isAdmin, articleController.delete);
router.get('/category/:categoryId', articleController.getByCategory);

module.exports = router;
