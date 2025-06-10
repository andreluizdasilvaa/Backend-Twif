const prisma = require('../prisma');

const createOrderModel = async (name, email, description) => {
    return await prisma.order.create({
        data: {
            nome: name,
            email: email,
            problema: description
        },
    });
};

module.exports = createOrderModel;