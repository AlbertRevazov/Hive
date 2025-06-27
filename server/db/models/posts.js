'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate({ Users, UserPosts }) {
      // Определение связи "многие ко многим" через промежуточную таблицу
      Posts.belongsTo(Users, {
        foreignKey: 'user_id',
        as: 'author',
      });
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Posts',
    },
  );
  return Posts;
};
