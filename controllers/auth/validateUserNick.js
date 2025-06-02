const prisma = require('../../models/prisma');
const asyncHandler = require('../../utils/asyncHandler');
const createHttpError = require('http-errors');

const validateEmail = asyncHandler(async (req, res) => {
    const { usernick } = req.body;

    if(!usernick) {
        throw createHttpError(400, 'Usernick é obrigatório');
    }

    const existingUserNick = await prisma.user.findUnique({
        where: {
            usernick
        }
    })

    if(existingUserNick) {
        return res.status(409).json({ valid: false, msg: 'Usernick já está em uso.' });
    }
    res.status(200).json({ valid: true, msg: 'Usernick disponível e válido.' });
});

module.exports = validateEmail;