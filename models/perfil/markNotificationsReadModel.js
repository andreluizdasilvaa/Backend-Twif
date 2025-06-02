const prisma = require('../prisma');

const markNotificationsReadModel = async (userId, notificationId = null) => {
    return await prisma.notification.update({
        where: {
            id: notificationId,
            userId: userId,
        },
        data: {
            isViewed: true
        }
    });
};

module.exports = markNotificationsReadModel;