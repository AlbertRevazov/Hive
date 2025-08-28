const { Friends } = require('../db/models');
const { Router } = require('express');
const { Op } = require('sequelize');
const { getUserFriendRequests } = require('../utils/getUserData');
const { getInternalId } = require('../utils/getInternalId');
const router = new Router();

router.patch('/manage', async (req, res) => {
    try {
        const { requesterId, addreserId, action } = req.body;
        const currentRequesterId = await getInternalId(requesterId);
        const currentAddresseeId = await getInternalId(addreserId);

        if (!currentRequesterId || !currentAddresseeId) {
            return res.status(400).json({ error: 'Требуются оба ID пользователей' });
        }
        if (currentRequesterId === currentAddresseeId) {
            return res.status(400).json({ error: 'Нельзя добавить самого себя' });
        }

        const existing = await Friends.findOne({
            where: {
                [Op.or]: [
                    { requesterId: currentRequesterId, addresseeId: currentAddresseeId },
                    { requesterId: currentAddresseeId, addresseeId: currentRequesterId },
                ],
            },
        });

        if (!existing) {
            return res.status(400).json({
                error: 'Такого запроса не существует',
            });
        }
        await existing.update({
            status: action === 'accept' ? 'accepted' : 'rejected',
        });

        res.json({
            message: action === 'accept' ? 'Запрос принят!' : 'Запрос отклонен',
        });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.get('/request', async (req, res) => {
    try {
        const { action } = req.query;
        const requesterId = await getInternalId(req.query.requesterId);
        const addresseeId = await getInternalId(req.query.addresseeId);
        if (!requesterId || !addresseeId) {
            return res.status(400).json({ error: 'Требуются оба ID пользователей' });
        }
        if (requesterId === addresseeId) {
            return res.status(400).json({ error: 'Нельзя добавить самого себя' });
        }

        const existing = await Friends.findOne({
            where: {
                [Op.or]: [
                    { requesterId, addresseeId },
                    { requesterId: addresseeId, addresseeId: requesterId },
                ],
            },
        });

        if (action === 'create' && !existing) {
            const friendship = await Friends.create({
                requesterId,
                addresseeId,
                status: 'pending',
            });

            res.json({ message: 'Запрос отправлен!', friendship });
        } else if (action === 'remove' && !!existing) {
            existing.destroy();
            res.json({ message: 'Удален из друзей!' });
        } else {
            res.json({ existing });
        }
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const currentUserId = await getInternalId(req.params.id);
        const friends = await getUserFriendRequests(currentUserId);
        console.log(JSON.parse(JSON.stringify(friends)), '------------------', currentUserId);
        res.status(200).json({ friends });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
