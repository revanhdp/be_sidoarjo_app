const express = require('express');
const router = express.Router();
const RecipeCommentController = require('../controllers/recipeCommentController');

router.get('/', RecipeCommentController.getAll);
router.get('/recipe/:recipeId', RecipeCommentController.getByRecipeId);
router.post('/', RecipeCommentController.create);

module.exports = router;