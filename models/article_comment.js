'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleComment = sequelize.define('ArticleComment', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'article_comment'
  });

  ArticleComment.associate = function(models) {
    ArticleComment.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user'
    });

    ArticleComment.belongsTo(models.Article, {
      foreignKey: 'article_id',
      as: 'article'
    });
  };

  return ArticleComment;
};
