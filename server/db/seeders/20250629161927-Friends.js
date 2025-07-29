'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Friends', [
            {
                requesterId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                addresseeId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
                status: 'accepted',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Friends', null);
    },
};
