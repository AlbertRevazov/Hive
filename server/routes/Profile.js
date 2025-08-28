const { Router } = require('express');
const { Users, UserAuthProviders } = require('../db/models');
const { v4: uuidv4 } = require('uuid');
const { getUserFriends } = require('../utils/getUserData');
const { getInternalId } = require('../utils/getInternalId');
const router = new Router();

router.post('/provider', async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) return res.status(400).json({ message: 'Данные пользователя не получены' });

        console.log(user.id);
        const currentId = await getInternalId(user.id);
        const authProvider = await Users.findOne({ where: { id: currentId } });
        if (authProvider) {
            const userFriends = await getUserFriends(currentId);
            return res.json({
                user: authProvider,
                friends: userFriends,
            });
        } else {
            const [first, last] = user.name.split(' ');

            const newUser = await Users.create({
                id: uuidv4(),
                name: first,
                lastName: last,
                email: user.email,
                password: '',
                img: user.img,
                isAdmin: false,
                lastOnline: new Date(),
            });

            await UserAuthProviders.create({
                userId: newUser.id,
                providerType: user.provider,
                providerId: user.id,
            });

            return res.status(201).json({
                user: newUser,
                message: 'Пользователь успешно зарегистрирован',
            });
        }
    } catch (error) {
        console.error('Ошибка:', error);
        return res.status(500).json({
            error: 'Ошибка сервера',
            details: error.message,
        });
    }
});

router.post('/user', async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) return res.status(400).json({ message: 'Данные пользователя не получены' });
        const userExists = await Users.findOne({ where: { email: user.email } });
        const userFriends = await getUserFriends(user.id);
        return userExists
            ? res.json({ user: userExists, friends: userFriends })
            : res.status(404).json({ message: 'Пользователь не найден' });
    } catch (error) {
        console.error('Ошибка:', error);
        return res.status(500).json({
            error: 'Ошибка сервера',
            details: error.message,
        });
    }
});

module.exports = router;
