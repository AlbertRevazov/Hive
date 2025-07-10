const { Op } = require('sequelize');
const { Users, Posts, Friends, Comments } = require('../db/models');

// для постов пользователя
async function getUserPosts(userId) {
    return await Posts.findAll({
        where: { userId },
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
}

// для комментариев пользователя
async function getUserComments(userId) {
    return await Comments.findAll({
        where: { userId },
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
}

// для друзей пользователя
async function getUserFriends(userId) {
    const friends = await Friends.findAll({
        where: {
            status: 'accepted',
            [Op.or]: [{ requesterId: userId }, { addresseeId: userId }],
        },
        include: [
            {
                model: Users,
                as: 'requester',
                attributes: ['id', 'name', 'lastName', 'img'],
                where: { id: { [Op.ne]: userId } },
                required: false,
            },
            {
                model: Users,
                as: 'addressee',
                attributes: ['id', 'name', 'lastName', 'img'],
                where: { id: { [Op.ne]: userId } },
                required: false,
            },
        ],
    });

    return friends.map((f) => f.requester || f.addressee).filter(Boolean);
}

// для статуса дружбы
async function getFriendshipStatus(requesterId, addresseeId) {
    const friendship = await Friends.findOne({
        where: {
            [Op.or]: [
                { requesterId, addresseeId },
                { requesterId: addresseeId, addresseeId: requesterId },
            ],
        },
    });

    if (!friendship) return 'none';
    return friendship.status;
}
module.exports = { getUserComments, getUserFriends, getFriendshipStatus, getUserPosts };
