const { Router } = require('express');
const { Users } = require('../db/models');
const { getUserPosts, getFriendshipStatus } = require('../utils/getUserData');
const { getInternalId } = require('../utils/getInternalId');
const router = new Router();

router.post('/', async (req, res) => {
    try {
        const { personId, user } = req.body;

        if (personId === null || user === null) {
            res.status(400).json({ message: 'Такого пользователя не существует' });
        } else {
            const currentUserId = await getInternalId(user.id);
            const currentPersonId = await getInternalId(personId);
            const person = await Users.findOne({ where: { id: currentPersonId } });
            const posts = await getUserPosts(currentPersonId);
            const friendship = await getFriendshipStatus(currentPersonId, currentUserId);
            res.status(200).send({ person, posts, friendship });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
