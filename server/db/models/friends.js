'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Friends extends Model {
        static associate(models) {
            Friends.belongsTo(models.User, { as: 'requester', foreignKey: 'requesterId' });
            Friends.belongsTo(models.User, { as: 'addressee', foreignKey: 'addresseeId' });
        }
    }
    Friends.init(
        {
            requesterId: DataTypes.INTEGER,
            addresseeId: DataTypes.INTEGER,
            status: {
                type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
                defaultValue: 'pending',
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Friends',
        },
    );
    return Friends;
};
