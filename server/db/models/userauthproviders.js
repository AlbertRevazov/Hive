// models/userauthprovider.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserAuthProviders extends Model {
        static associate(models) {
            UserAuthProviders.belongsTo(models.Users, {
                foreignKey: 'userId',
                as: 'user',
                onDelete: 'CASCADE',
            });
        }
    }
    UserAuthProviders.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'id', // явное указание
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'userId', // явное указание
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            providerType: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'providerType', // явное указание
            },
            providerId: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'providerId', // явное указание
            },
        },
        {
            sequelize,
            modelName: 'UserAuthProviders',
            tableName: 'UserAuthProviders',
            timestamps: true,
            underscored: false, // отключаем автоматическое преобразование в snake_case
        },
    );
    return UserAuthProviders;
};
