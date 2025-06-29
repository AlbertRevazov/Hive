'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        static associate(models) {
            Likes.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Likes.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
        }
    }
    Likes.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Likes',
        },
    );
    return Likes;
};
