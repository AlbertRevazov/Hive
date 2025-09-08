const { Router } = require('express');
const { Likes } = require('../db/models');
const router = new Router();

router.post('/add', async (req, res) => {
    try {
        const { userId, postId } = req.body;
        if (!userId || !postId) {
            return res.status(400).json({
                error: 'User Id, Post Id are required',
            });
        }
        const existingLike = await Likes.findOne({ where: [{ userId, postId }] });
        if (existingLike) {
            return res.json({ message: 'Like is already exist' });
        }
        await Likes.create({ userId, postId });
        return res.json({ message: 'Like is added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/remove', async (req, res) => {
    try {
        const { userId, postId } = req.body;
        if (!userId || !postId) {
            return res.status(400).json({
                error: 'User Id, Post Id are required',
            });
        }
        const existingLike = await Likes.destroy({ where: [{ userId, postId }] });
        if (!existingLike) {
            return res.json({ message: 'Like is not Found' });
        }
        return res.json({ message: 'Like is removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
