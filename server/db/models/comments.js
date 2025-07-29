'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        static associate(models) {
            Comments.belongsTo(models.Users, { foreignKey: 'userId', as: 'author' });
            Comments.belongsTo(models.Posts, { foreignKey: 'postId', as: 'post' });
        }
    }
    Comments.init(
        {
            userId: DataTypes.UUID,
            postId: DataTypes.UUID,
            text: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Comments',
        },
    );
    return Comments;
};
