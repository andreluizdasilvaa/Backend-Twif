const prisma = require('../../models/prisma');

const listPostModel = async (userId, page = 1, limit = 5) => {
    const skip = (page - 1) * limit;
    
    const [posts, totalPosts] = await Promise.all([
        prisma.post.findMany({
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        nome: true,
                        profilePicture: true,
                        usernick: true,
                    },
                },
                comments: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
            },
            orderBy: [
                {
                    likes: {
                        _count: 'desc',
                    },
                },
                {
                    createdAt: 'desc',
                },
            ],
        }),
        prisma.post.count()
    ]);

    // Adiciona likedByCurrentUser
    posts.forEach(post => {
        post.likedByCurrentUser = post.likes.some(like => like.userId === userId);
    });

    return { posts, totalPosts };
}

module.exports = listPostModel;