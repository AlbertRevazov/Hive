'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Comments', [
            {
                userId: 2,
                postId: 1,
                text: 'Добро пожаловать в Hive!',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 3,
                postId: 2,
                text: 'Какой язык программирования сегодня?',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Comments', null);
    },
};
