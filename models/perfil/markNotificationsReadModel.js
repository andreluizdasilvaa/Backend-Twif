const prisma = require('../prisma');

const markNotificationsReadModel = async (userId, notificationIds = null) => {
    const whereClause = {
        userId: userId
    };
    
    // Se notificationIds for fornecido, atualize apenas essas notificações específicas
    if (notificationIds && notificationIds.length > 0) {
        whereClause.id = {
            in: notificationIds.map(id => parseInt(id))
        };
    }

    return await prisma.notification.updateMany({
        where: whereClause,
        data: {
            isViewed: true
        }
    });
};

module.exports = markNotificationsReadModel;