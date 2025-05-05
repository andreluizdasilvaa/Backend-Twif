const prisma = require('../prisma');
const createHttpError = require('http-errors');

const userNotificationsModel = async (userId) => {
    // Busca todas as notificações do usuário, ordenadas por data decrescente
    const notifications = await prisma.notification.findMany({
        where: {
            userId: userId,
        },
        include: {
            // Inclui os dados do usuário que gerou a notificação
            triggeredBy: {
                select: {
                    id: true,
                    nome: true,
                    usernick: true,
                    profilePicture: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    // Array para armazenar as notificações formatadas
    const formattedNotifications = [];

    // Formata cada notificação com informações adicionais
    for (const notification of notifications) {
        const formattedNotification = {
            id: notification.id,
            action: notification.action,
            isViewed: notification.isViewed,
            createdAt: notification.createdAt,
            triggeredBy: notification.triggeredBy,
        };

        // Adiciona informações específicas com base no tipo de ação
        if (notification.action === 'like') {
            // Para curtidas, adiciona informações do post
            if (notification.postId) {
                const post = await prisma.post.findUnique({
                    where: { id: notification.postId },
                    select: { content: true },
                });

                if (post) {
                    formattedNotification.postId = notification.postId;
                    formattedNotification.postPreview = post.content.length > 50 
                        ? post.content.substring(0, 50) + '...' 
                        : post.content;
                }
            }
        } else if (notification.action === 'comment') {
            // Para comentários, busca o conteúdo do comentário e do post
            if (notification.postId) {
                const post = await prisma.post.findUnique({
                    where: { id: notification.postId },
                    select: { 
                        id: true,
                        content: true,
                    },
                });

                if (post) {
                    formattedNotification.postId = notification.postId;
                    formattedNotification.postPreview = post.content.length > 50 
                        ? post.content.substring(0, 50) + '...' 
                        : post.content;
                    
                    // Busca o comentário mais recente deste usuário neste post
                    const comment = await prisma.comment.findFirst({
                        where: {
                            postId: notification.postId,
                            userId: notification.triggeredById,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        select: {
                            id: true,
                            content: true,
                        },
                    });

                    if (comment) {
                        formattedNotification.commentId = comment.id;
                        formattedNotification.commentPreview = comment.content.length > 50 
                            ? comment.content.substring(0, 50) + '...' 
                            : comment.content;
                    }
                }
            }
        } else if (notification.action === 'postDeleteByAdm') {
            // Para posts deletados por admin, busca informações do post deletado
            if (notification.postDeletedId) {
                const deletedPost = await prisma.postdeleted.findUnique({
                    where: { id: notification.postDeletedId },
                    select: {
                        content: true,
                        createdAt: true,
                    },
                });

                if (deletedPost) {
                    formattedNotification.postDeletedId = notification.postDeletedId;
                    formattedNotification.deletedPostPreview = deletedPost.content.length > 50 
                        ? deletedPost.content.substring(0, 50) + '...' 
                        : deletedPost.content;
                    formattedNotification.deletedPostCreatedAt = deletedPost.createdAt;
                }
            }
        }

        formattedNotifications.push(formattedNotification);
    }

    return formattedNotifications;
};

module.exports = userNotificationsModel;