'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryArticle = sequelize.define('CategoryArticle', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'category_article'
  });

  CategoryArticle.associate = function(models) {
    CategoryArticle.hasMany(models.Article, {
      foreignKey: 'category_id',
      as: 'articles'
    });
  };

  return CategoryArticle;
};
