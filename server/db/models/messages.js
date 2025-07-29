'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Messages extends Model {
        static associate(models) {
            // Сообщение принадлежит отправителю
            Messages.belongsTo(models.Users, {
                foreignKey: 'senderId',
                as: 'sender',
            });

            // Сообщение принадлежит получателю
            Messages.belongsTo(models.Users, {
                foreignKey: 'receiverId',
                as: 'receiver',
            });
        }
    }
    Messages.init(
        {
            senderId: DataTypes.UUID,
            receiverId: DataTypes.UUID,
            content: DataTypes.TEXT,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Messages',
        },
    );
    return Messages;
};
