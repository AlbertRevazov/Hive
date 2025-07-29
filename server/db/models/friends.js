'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Friends extends Model {
        static associate(models) {
            Friends.belongsTo(models.Users, { as: 'requester', foreignKey: 'requesterId' });
            Friends.belongsTo(models.Users, { as: 'addressee', foreignKey: 'addresseeId' });
        }
    }
    Friends.init(
        {
            requesterId: DataTypes.UUID,
            addresseeId: DataTypes.UUID,
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
