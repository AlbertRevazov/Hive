'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Messages extends Model {
        static associate(models) {
            // Сообщение принадлежит отправителю
            Messages.belongsTo(models.User, {
                foreignKey: 'senderId',
                as: 'sender',
            });

            // Сообщение принадлежит получателю
            Messages.belongsTo(models.User, {
                foreignKey: 'receiverId',
                as: 'receiver',
            });
        }
    }
    Messages.init(
        {
            senderId: DataTypes.INTEGER,
            receiverId: DataTypes.INTEGER,
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
