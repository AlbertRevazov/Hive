const { Router } = require('express');
const { Users } = require('../db/models');
const { getUserPosts, getFriendshipStatus } = require('../utils/getUserData');
const router = new Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sessionId } = req.query;
        const person = await Users.findOne({ where: { id } });
        const posts = await getUserPosts(id);
        const friendshipStatus = await getFriendshipStatus(sessionId, id);

        res.status(200).json({ person, posts, friendshipStatus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
