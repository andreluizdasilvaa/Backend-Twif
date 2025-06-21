const prisma = require('../prisma');

const editInfoUserModel = async (userId, data) => {
    return await prisma.user.update({
        where: {
            id: userId
        }, 
        data,
        select: {
            nome: true,
            course: true,
            nascimento: true,
            bio: true
        }
    })
};

module.exports = editInfoUserModel;