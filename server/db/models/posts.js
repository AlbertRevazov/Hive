'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate(models) {
            Posts.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
            Posts.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
            Posts.hasMany(models.Like, { foreignKey: 'postId', as: 'likes' });
        }
    }
    Posts.init(
        {
            userId: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            isPublic: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Posts',
        },
    );
    return Posts;
};
