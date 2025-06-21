const asyncHandler = require("../../utils/asyncHandler");
const deleteOrderModel = require("../../models/suport/deleteOrderModel")
const createHttpError = require('http-errors');

const deleteReportController = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    if(!orderId) {
        throw createHttpError(400, 'Informações faltantes')
    }

    // Deleta o order pelo Id
    await deleteOrderModel(orderId);

    res.status(200).json({ msg: "Deletado com sucesso" })
});

module.exports = deleteReportController;