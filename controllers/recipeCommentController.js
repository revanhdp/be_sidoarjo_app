const { recipe_comment, recipe, Users } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const data = await recipe_comment.findAll({
        include: [
          {
            model: recipe,
            as: 'recipe'
          },
          {
            model: Users,
            as: 'user',
            attributes: ['id', 'first_name'] 
          }
        ]
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getByRecipeId(req, res) {
    try {
      const { recipeId } = req.params;

      const comments = await recipe_comment.findAll({
        where: { recipe_id: recipeId },
        include: [
          { model: recipe, as: 'recipe' },
          { model: Users, as: 'user' }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const { user_id, recipe_id, comment, rating } = req.body;

      const newComment = await recipe_comment.create({
        user_id,
        recipe_id,
        comment,
        rating
      });

      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
