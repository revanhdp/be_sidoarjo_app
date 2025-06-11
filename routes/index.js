const express = require("express");
const router = express.Router();

// Import controller article
const articleController = require("../controllers/ArticleController");

// Tes route
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes untuk Article
router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getById);
router.post('/articles', articleController.create);
router.put('/articles/:id', articleController.update);
router.delete('/articles/:id', articleController.delete);

module.exports = router;
