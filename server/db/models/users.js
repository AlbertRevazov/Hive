'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasMany(models.Posts, { foreignKey: 'userId', as: 'posts' });
            Users.hasMany(models.Comments, { foreignKey: 'userId', as: 'comments' });
            Users.hasMany(models.Messages, { foreignKey: 'senderId', as: 'sentMessages' });
            Users.hasMany(models.Messages, { foreignKey: 'receiverId', as: 'receivedMessages' });
            Users.belongsToMany(models.Users, {
                through: 'Friendship',
                as: 'friends',
                foreignKey: 'requesterId',
                otherKey: 'addresseeId',
            });
        }
    }
    Users.init(
        {
            name: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.STRING,
            img: DataTypes.TEXT,
            desc: DataTypes.TEXT,
            isAdmin: DataTypes.BOOLEAN,
            isBanned: DataTypes.BOOLEAN,
            banExpires: DataTypes.DATE,
            lastOnline: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Users',
        },
    );
    return Users;
};
