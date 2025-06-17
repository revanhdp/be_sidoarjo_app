const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleController')
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/cloudinaryStorageArticle')

router.get('/', articleController.getAll);
router.post('/articles/full', upload.array('img_url', 3), articleController.createFullArticle);
router.get('/categories', articleController.getAllCategory);
router.get('/:id', articleController.getById);
router.post('/',  articleController.create);
router.put('/:id',  articleController.update);
router.get('/category/:categoryId', articleController.getByCategory);
router.delete('/:id', articleController.delete);

module.exports = router;
