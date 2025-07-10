const { Router } = require('express');
const { getAllPostsWithDetails } = require('../utils/getPostsData');
const router = new Router();

router.get('/list', async (req, res) => {
    try {
        const posts = await getAllPostsWithDetails();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
