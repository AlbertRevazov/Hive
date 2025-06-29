'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        static associate(models) {
            Comments.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
            Comments.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
        }
    }
    Comments.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
            text: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Comments',
        },
    );
    return Comments;
};
