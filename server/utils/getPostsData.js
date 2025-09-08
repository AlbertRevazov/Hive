const { Users, Posts, Comments, Likes } = require('../db/models');

// для всех постов, их авторов, лайков и комментариев
async function getAllPostsWithDetails(userId) {
    const posts = await Posts.findAll({
        include: [
            {
                model: Users,
                as: 'author',
                attributes: ['id', 'name', 'lastName', 'img'],
            },
            {
                model: Likes,
                as: 'likes',
                include: [
                    {
                        model: Users,
                        as: 'user',
                        attributes: ['id'],
                    },
                ],
            },
            {
                model: Comments,
                as: 'comments',
                include: [
                    {
                        model: Users,
                        as: 'author',
                        attributes: ['id', 'name', 'lastName', 'img'],
                    },
                ],
                order: [['createdAt', 'ASC']],
            },
        ],
        order: [['createdAt', 'DESC']],
    });

    return posts;
}
module.exports = { getAllPostsWithDetails };
