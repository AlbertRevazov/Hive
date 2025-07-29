'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        static associate(models) {
            Likes.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
            Likes.belongsTo(models.Posts, { foreignKey: 'postId', as: 'post' });
        }
    }
    Likes.init(
        {
            userId: DataTypes.UUID,
            postId: DataTypes.UUID,
        },
        {
            sequelize,
            modelName: 'Likes',
        },
    );
    return Likes;
};
