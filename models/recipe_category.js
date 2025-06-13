'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeCategory = sequelize.define('recipe_category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img_url: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  
  RecipeCategory.associate = function(models) {
    RecipeCategory.hasMany(models.recipe, {
      foreignKey: 'category_id'
    });
  };

  return RecipeCategory;
};
