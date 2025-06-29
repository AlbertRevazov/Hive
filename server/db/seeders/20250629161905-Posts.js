'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Posts', [
            {
                id: 1,
                userId: 1,
                content: 'Привет всем! Это мой первый пост в Hive!',
                isPublic: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                userId: 2,
                content: 'Сегодня прекрасный день для кодинга!',
                isPublic: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Posts', null);
    },
};
