const asyncHandler = require("../../utils/asyncHandler");

const getAllOrdersController = asyncHandler(async (req, res) => {

    req.status(200).json({
        msg: "Olá"
    })
});

module.exports = getAllOrdersController;