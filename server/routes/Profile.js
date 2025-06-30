const { Op } = require('sequelize');
const { Router } = require('express');
const { Users, Posts, Friends, Comments } = require('../db/models');
const router = new Router();

router.get('/user/:id', async (req, res) => {
    try {
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
        const comments = await Comments.findAll({
            where: { userId: req.params.id },
            attributes: ['text'],
            include: [
                {
                    model: Users,
                    as: 'author',
                    attributes: ['name', 'lastName', 'email', 'password', 'phone', 'img', 'desc'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        const friends = await Friends.findAll({
            where: {
                status: 'accepted',
                [Op.or]: [{ requesterId: req.params.id }, { addresseeId: req.params.id }],
            },
            include: [
                {
                    model: Users,
                    as: 'requester',
                    attributes: ['id', 'name', 'lastName', 'img'],
                    where: { id: { [Op.ne]: req.params.id } }, 
                    required: false,
                },
                {
                    model: Users,
                    as: 'addressee',
                    attributes: ['id', 'name', 'lastName', 'img'],
                    where: { id: { [Op.ne]: req.params.id } }, 
                    required: false,
                },
            ],
        });

        const friendsList = friends.map((f) => f.requester || f.addressee).filter(Boolean);
        res.status(200).json({
            posts,
            comments,
            friends: friendsList,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
