'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    overview: DataTypes.TEXT,
    img_url: DataTypes.STRING,
    slug: DataTypes.STRING,
    how_to_make: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    prep_time: DataTypes.INTEGER,
    cook_time: DataTypes.INTEGER,
    serving: DataTypes.INTEGER
  }, {});

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.recipe_category, {
      foreignKey: 'category_id'
    });

    Recipe.hasMany(models.recipe_comment, {
      foreignKey: 'recipe_id'
    });

    Recipe.hasMany(models.recipe_favorite, {
      foreignKey: 'recipe_id'
    });
  };

  return Recipe;
};
