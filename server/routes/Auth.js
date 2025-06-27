const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();
const { Users } = require('../db/models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { name, lastName, email, password, phone, img, desc, friends } = req.body;
    const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPT_ROUNDS));
    const user = await Users.create({
      name,
      lastName: lastName || '',
      email,
      password: hashedPassword,
      phone,
      img: img || '',
      desc: desc || '',
      friends: friends || '',
      isAdmin: false,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
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
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
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
