const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleImageController');
const upload = require('../middlewares/cloudinaryStorageArticle');

router.post('/upload/:article_id', upload.array('images', 3), controller.upload);

module.exports = router;