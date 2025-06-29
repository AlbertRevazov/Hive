'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
            Users.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
            Users.hasMany(models.Message, { foreignKey: 'senderId', as: 'sentMessages' });
            Users.hasMany(models.Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
            Users.belongsToMany(models.User, {
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
