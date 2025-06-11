const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleController')

router.get('/', articleController.getAll);
router.get('/:id', articleController.getById);
router.post('/', articleController.create);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.delete);

module.exports = router;
