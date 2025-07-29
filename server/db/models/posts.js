'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate(models) {
            Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'author' });
            Posts.hasMany(models.Comments, { foreignKey: 'postId', as: 'comments' });
            Posts.hasMany(models.Likes, { foreignKey: 'postId', as: 'likes' });
        }
    }
    Posts.init(
        {
            userId: DataTypes.UUID,
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
