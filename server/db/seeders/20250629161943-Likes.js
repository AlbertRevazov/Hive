'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Likes',
            [
                {
                    userId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                    postId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
                    postId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae02',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            { returning: true },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Likes', null);
    },
};
