const asyncHandler = require("../../utils/asyncHandler");
const { markAsViewedModel, generateNotifyReportViwed } = require('../../models/suport/markAsViewedModel')
const createHttpError = require('http-errors');

const markAsViewedController = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const admId = req.user.id;
    
    if(!orderId) {
        throw createHttpError(400, 'Informações faltantes')
    }

    // Marca o Order como visto
    await markAsViewedModel(orderId);

    // Gera a notificação
    await generateNotifyReportViwed(orderId, admId);

    res.status(200).json({ msg: 'Marcado como visualizado com sucesso!' })
});

module.exports = markAsViewedController;