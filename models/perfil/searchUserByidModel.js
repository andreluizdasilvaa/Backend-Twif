const prisma = require('../prisma');
const createHttpError = require('http-errors');

const searchUserByidModel = async (usernick) => {
    const user = await prisma.user.findUnique({
        where: { usernick: usernick },
    });

    if (!user) {
        throw createHttpError(404, "Usuário não encontrado");
    }

    return user;
};

module.exports = searchUserByidModel;