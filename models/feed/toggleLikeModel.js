const prisma = require('../prisma');
const createHttpError = require('http-errors');

const toggleLikeModel = async (postId, userId) => {
    // Verifica se o usuário já curtiu a postagem
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: userId,
                postId: parseInt(postId),
            },
        },
    });
    
    // Obtém o autor do post
    const post = await prisma.post.findUnique({
        where: { id: parseInt(postId) },
        select: { userId: true },
    });
    
    if (!post) {
        throw createHttpError(404, 'Post não encontrado');
    }
    
    const authorId = post.userId;

    if (existingLike) {
        // Se já curtiu, remove a curtida (descurtir)
        await prisma.like.delete({
            where: {
                id: existingLike.id,
            },
        });

        // Remove a notificação correspondente
        await prisma.notification.deleteMany({
            where: {
                userId: authorId,
                triggeredById: userId,
                postId: parseInt(postId),
                action: 'like',
            },
        });

        return 'unliked'; 
    } else {
        // Caso contrário, adiciona a curtida
        await prisma.like.create({
            data: {
                userId: userId,
                postId: parseInt(postId),
            },
        });

        // Adiciona uma notificação apenas se o usuário curtindo não for o autor do post
        if (authorId !== userId) {
            await prisma.notification.create({
                data: {
                    userId: authorId,
                    triggeredById: userId,
                    postId: parseInt(postId),
                    action: 'like',
                },
            });
        }

        return 'liked'; 
    }
};

module.exports = toggleLikeModel;