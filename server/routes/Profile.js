const { Router } = require('express');
const { Users, UserAuthProviders } = require('../db/models');
const { v4: uuidv4 } = require('uuid');
const router = new Router();

router.post('/provider', async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) return res.status(400).json({ message: 'Данные пользователя не получены' });

        const authProvider = await UserAuthProviders.findOne({
            where: { providerId: user.id },
            include: ['user'],
        });

        if (authProvider) return res.json(authProvider.user);
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

        if (user.provider === 'credentials') {
            const userExists = await Users.findOne({ where: { email: user.email } });
            return userExists
                ? res.json(userExists)
                : res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        console.error('Ошибка:', error);
        return res.status(500).json({
            error: 'Ошибка сервера',
            details: error.message,
        });
    }
});

module.exports = router;
