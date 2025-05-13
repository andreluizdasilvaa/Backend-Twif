const userNotificationsModel = require('../../models/perfil/userNotificationsModel');
const asyncHandler = require('../../utils/asyncHandler');
const createHttpError = require('http-errors');

const userNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        throw createHttpError(400, 'ID do usuário não fornecido');
    }

    const notifications = await userNotificationsModel(userId);

    res.status(200).json(notifications);
});

module.exports = userNotifications;
