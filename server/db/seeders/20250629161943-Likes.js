'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Likes',
            [
                {
                    userId: 1,
                    postId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    postId: 2,
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
