'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteArticle = sequelize.define('FavoriteArticle', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'favorite_article'
  });

  FavoriteArticle.associate = function(models) {
    FavoriteArticle.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user'
    });

    FavoriteArticle.belongsTo(models.Article, {
      foreignKey: 'article_id',
      as: 'article'
    });
  };

  return FavoriteArticle;
};
