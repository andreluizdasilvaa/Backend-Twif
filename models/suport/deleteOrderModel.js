const prisma = require('../prisma');

const deleteOrderModel = async (orderId) => {
    return await prisma.order.delete({
        where: {
            id: orderId
        }
    });
};

module.exports = deleteOrderModel;