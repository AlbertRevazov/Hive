const { Router } = require('express');
const { Users, Posts } = require('../db/models');
const router = new Router();

router.get('/:id', async (req, res) => {
    try {
        const person = await Users.findOne({ where: { id: req.params.id } });
        const posts = await Posts.findAll({
            where: { userId: req.params.id },
            attributes: ['id', 'content', 'createdAt', 'isPublic'],
            include: [
                {
                    model: Users,
                    as: 'author',
                    attributes: ['name', 'lastName', 'email', 'password', 'phone', 'img', 'desc'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        const dataList = { person, posts };
        res.status(200).json(dataList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
