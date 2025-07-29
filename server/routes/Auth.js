const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();
const { Users } = require('../db/models');
const bcrypt = require('bcrypt');

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

module.exports = router;
