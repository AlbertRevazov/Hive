const { Router } = require('express');
const { Comments } = require('../db/models');
const { getInternalId } = require('../utils/getInternalId');

const router = new Router();

router.post('/create', async (req, res) => {
    try {
        const { userId, postId, text } = req.body;
        console.log(userId, postId, text, '=======');
        if (!userId || !postId || !text) {
            return res.status(400).json({ error: 'User, text and post ID are required' });
        } else {
            const currentId = await getInternalId(userId);
            await Comments.create({
                userId: currentId,
                postId,
                text,
            });
            return res.status(200).json({ message: 'Successfully created comment' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
