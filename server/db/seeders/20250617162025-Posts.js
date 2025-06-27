'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [
      {
        id: 1,
        user_id: 1,
        title: 'meow',
        desc: 'cat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 2,
        title: 'hav',
        desc: 'dog',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        user_id: 3,
        title: 'muuu',
        desc: 'cow',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Posts', posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null);
  },
};
