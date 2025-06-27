'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admin = [
      {
        id: 1,
        name: 'Albert',
        lastName: 'Revazov',
        phone: '8 999 999 99 99',
        email: 'abe@bk.ru',
        password: await bcrypt.hash(process.env.ADMIN_PASS, Number(process.env.CRYPT_ROUNDS)),
        isAdmin: true,
        img: 'https://avatars.githubusercontent.com/u/102243637?v=4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Murat',
        lastName: 'Revazov',
        phone: '8 999 999 99 99',
        email: 'Murat@bk.ru',
        password: await bcrypt.hash(process.env.ADMIN_PASS, Number(process.env.CRYPT_ROUNDS)),
        isAdmin: true,
        img: 'https://avatars.githubusercontent.com/u/102243637?v=4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Ignat',
        lastName: 'Revazov',
        phone: '8 999 999 99 99',
        email: 'Ignat@bk.ru',
        password: await bcrypt.hash(process.env.ADMIN_PASS, Number(process.env.CRYPT_ROUNDS)),
        isAdmin: false,
        img: 'https://avatars.githubusercontent.com/u/102243637?v=4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', admin);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null);
  },
};
