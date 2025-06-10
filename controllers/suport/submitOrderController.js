const asyncHandler = require("../../utils/asyncHandler");
const createOrderModel = require("../../models/suport/createOrderModel")
const createHttpError = require('http-errors');
const prisma = require("../../models/prisma");

const submitOrderController = asyncHandler(async (req, res) => {
    const { description } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    await createOrderModel(user.nome, user.email, description);

    res.status(201).json({
        msg: "Suporte salvo com sucesso"
    })
});

module.exports = submitOrderController;