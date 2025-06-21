const prisma = require('../prisma');

const listAllOrderModel = async () => {
    return await prisma.order.findMany({
        where: {
            isViewd: false
        },
        select: {
            id: true,
            nome: true,
            createdAt: true,
            problema: true
        }
    });
};

module.exports = listAllOrderModel;