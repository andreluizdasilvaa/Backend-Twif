const prisma = require('../prisma');

const listAllOrderModel = async () => {
    return await prisma.order.findMany({
        select: {
            nome: true,
            createdAt: true,
            problema: true
        }
    });
};

module.exports = listAllOrderModel;