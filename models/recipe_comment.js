'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeComment = sequelize.define('recipe_comment', {
    user_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });

  RecipeComment.associate = function(models) {
    RecipeComment.belongsTo(models.recipe, {
      foreignKey: 'recipe_id'
    });

    RecipeComment.belongsTo(models.Users, {
      foreignKey: 'user_id'
    });
  };

  return RecipeComment;
};
