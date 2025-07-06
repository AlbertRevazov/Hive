const { Router } = require('express');
const { getUserPosts, getUserComments, getUserFriends } = require('../utils/getUserData');
const router = new Router();

router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await getUserPosts(id);
        const comments = await getUserComments(id);
        const friends = await getUserFriends(id);

        res.status(200).json({
            posts,
            comments,
            friends,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
