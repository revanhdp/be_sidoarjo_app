'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    desc: DataTypes.TEXT,
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: DataTypes.INTEGER,
    data_article: DataTypes.TEXT('long')
  }, {
    tableName: 'article'
  });

  Article.associate = function(models) {
    Article.belongsTo(models.CategoryArticle, {
      foreignKey: 'category_id',
      as: 'category'
    });

    Article.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'author'
    });

    Article.hasMany(models.ArticleImg, {
      foreignKey: 'article_id',
      as: 'images'
    });

    Article.hasMany(models.FavoriteArticle, {
      foreignKey: 'article_id',
      as: 'favorites'
    });

    Article.hasMany(models.ArticleComment, {
      foreignKey: 'article_id',
      as: 'comments'
    });
  };

  return Article;
};
