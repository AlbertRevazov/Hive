'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Comments', [
            {
                userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
                postId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
                text: 'Добро пожаловать в Hive!',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                postId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae02',
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
