'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeFavorite = sequelize.define('recipe_favorite', {
    user_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER
  }, {});

  RecipeFavorite.associate = function(models) {
    RecipeFavorite.belongsTo(models.recipe, {
      foreignKey: 'recipe_id'
    });

    RecipeFavorite.belongsTo(models.Users, {
      foreignKey: 'user_id'
    });
  };

  return RecipeFavorite;
};
