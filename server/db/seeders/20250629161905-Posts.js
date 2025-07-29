'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Posts', [
            {
                id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
                userId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                content: 'Привет всем! Это мой первый пост в Hive!',
                isPublic: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae02',
                userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
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
