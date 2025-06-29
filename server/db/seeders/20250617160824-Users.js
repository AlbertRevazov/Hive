'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await queryInterface.bulkInsert(
            'Users',
            [
                {
                    id: 1,
                    name: 'Admin',
                    lastName: 'Super',
                    email: 'abe@bk.ru',
                    password: await bcrypt.hash(
                        process.env.ADMIN_PASS,
                        Number(process.env.CRYPT_ROUNDS),
                    ),
                    phone: '+1234567890',
                    img: 'https://img5.lalafo.com/i/posters/original/a8/88/52/429e2fae2489ffaed54f3b097e.jpeg',
                    desc: 'Главный администратор Hive',
                    isAdmin: true,
                    isBanned: false,
                    banExpires: null,
                    lastOnline: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    name: 'Иван',
                    lastName: 'Петров',
                    email: 'ivan@hive.com',
                    password: await bcrypt.hash(
                        process.env.ADMIN_PASS,
                        Number(process.env.CRYPT_ROUNDS),
                    ),
                    phone: '+7222222222',
                    img: 'https://i.pravatar.cc/150?img=5',
                    desc: 'Люблю путешествия и фотографию',
                    isAdmin: false,
                    isBanned: false,
                    banExpires: null,
                    lastOnline: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 3,
                    name: 'Мария',
                    lastName: 'Сидорова',
                    email: 'maria@hive.com',
                    password: await bcrypt.hash(
                        process.env.ADMIN_PASS,
                        Number(process.env.CRYPT_ROUNDS),
                    ),
                    phone: '+7333333333',
                    img: 'https://i.pravatar.cc/150?img=6',
                    desc: 'Программист и художник',
                    isAdmin: false,
                    isBanned: false,
                    banExpires: null,
                    lastOnline: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            { returning: true },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null);
    },
};
