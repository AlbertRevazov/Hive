const { Router } = require('express');
const { getInternalId } = require('../utils/getInternalId');
const router = new Router();

router.get('/:id', async (req, res) => {
    try {
        const externalId = await getInternalId(req.params.id);
        res.status(200).json(externalId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
