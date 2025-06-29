const markNotificationsReadModel = require('../../models/perfil/markNotificationsReadModel');
const asyncHandler = require('../../utils/asyncHandler');
const createHttpError = require('http-errors');

const markNotificationsRead = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { notificationId } = req.body;

    const result = await markNotificationsReadModel(userId, notificationId);

    res.status(200).json({ 
        message: 'Notificações marcadas como lidas',
        count: result.count
    });
});

module.exports = markNotificationsRead;