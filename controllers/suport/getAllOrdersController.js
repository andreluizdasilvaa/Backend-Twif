const asyncHandler = require("../../utils/asyncHandler");
const listAllOrderModel = require('../../models/suport/listAllOrderModel')

const getAllOrdersController = asyncHandler(async (req, res) => {
    const data = await listAllOrderModel();

    res.status(200).json(data);
});

module.exports = getAllOrdersController;