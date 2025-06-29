'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate({ Posts }) {
            // Определение связи один ко многим с постами
            Users.hasMany(Posts, {
                foreignKey: 'user_id',
                as: 'posts',
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
            friends: DataTypes.TEXT,
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Users',
        },
    );
    return Users;
};
