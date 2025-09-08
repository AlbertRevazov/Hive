const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();
const { Users, ProviderAccounts } = require('../db/models');
const bcrypt = require('bcrypt');

// Существующие эндпоинты signUp и signIn...
router.post('/signUp', async (req, res) => {
    try {
        const { name, lastName, email, password, phone, image } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPT_ROUNDS));

        const user = await Users.create({
            name,
            lastName: lastName || '',
            email,
            password: hashedPassword,
            phone: phone || '',
            img: image || '',
            desc: '',
            friends: '',
            isAdmin: false,
            isBanned: false,
            banExpires: null,
            lastOnline: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(201).json({
            data: user,
            token,
            message: 'Succes sign Up',
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                error: 'Email not Found',
            });
        }
        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
            return res.json({
                message: 'Неверный пароль.',
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.json({
            data: user,
            token,
            message: 'Вы вошли в систему',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// НОВЫЙ ЭНДПОИНТ ДЛЯ ПРОВАЙДЕРОВ (OAuth)
router.post('/provider', async (req, res) => {
    try {
        const { provider, providerId, email, name, image } = req.body;

        if (!provider || !providerId || !email) {
            return res.status(400).json({
                error: 'Provider, providerId and email are required',
            });
        }

        // 1. Ищем пользователя по email
        let user = await Users.findOne({ where: { email } });

        if (!user) {
            // 2. Если пользователя нет, создаем нового (без пароля)
            user = await Users.create({
                name: name || email.split('@')[0],
                lastName: '',
                email,
                password: '', // Пустой пароль для OAuth пользователей
                phone: '',
                img: image || '',
                desc: '',
                friends: '',
                isAdmin: false,
                isBanned: false,
                banExpires: null,
                lastOnline: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        // 3. Ищем существующую связь с провайдером
        let providerAccount = await ProviderAccounts.findOne({
            where: {
                provider,
                providerId,
                userId: user.id,
            },
        });

        // 4. Если связи нет, создаем новую
        if (!providerAccount) {
            providerAccount = await ProviderAccounts.create({
                provider,
                providerId,
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        // 5. Генерируем JWT токен
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // 6. Возвращаем данные пользователя и токен
        res.json({
            userId: user.id,
            providerAccountId: providerAccount.id,
            user: {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                img: user.img,
                phone: user.phone,
            },
            token,
            message: 'Provider authentication successful',
        });
    } catch (error) {
        console.error('Provider auth error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ДОПОЛНИТЕЛЬНО: Эндпоинт для получения связанных провайдеров пользователя
router.get('/user/:userId/providers', async (req, res) => {
    try {
        const { userId } = req.params;

        const providerAccounts = await ProviderAccounts.findAll({
            where: { userId },
            attributes: ['id', 'provider', 'providerId', 'createdAt'],
        });

        res.json({ providers: providerAccounts });
    } catch (error) {
        console.error('Get providers error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
