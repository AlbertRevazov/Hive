'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            name: { allowNull: false, type: Sequelize.STRING },
            lastName: {
                type: Sequelize.STRING,
            },
            email: { allowNull: false, type: Sequelize.STRING, unique: true },
            password: { allowNull: false, type: Sequelize.STRING },
            phone: {
                type: Sequelize.STRING,
            },
            img: {
                type: Sequelize.TEXT,
            },
            desc: {
                type: Sequelize.TEXT,
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            isBanned: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            banExpires: {
                type: Sequelize.DATE,
            },
            lastOnline: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    },
};
