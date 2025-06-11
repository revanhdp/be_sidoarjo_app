'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleImg = sequelize.define('ArticleImg', {
    img_url: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_feature: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'article_img'
  });

  ArticleImg.associate = function(models) {
    ArticleImg.belongsTo(models.Article, {
      foreignKey: 'article_id',
      as: 'article'
    });
  };

  return ArticleImg;
};
