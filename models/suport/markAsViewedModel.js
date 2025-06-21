const createHttpError = require('http-errors');
const prisma = require('../prisma');

const markAsViewedModel = async (id) => {
    return await prisma.order.update({
        where: {
            id: id
        },
        data: {
            isViewd: true
        }
    });
};

const generateNotifyReportViwed = async (orderId, admId) => {
    // Busca o report
    const order = await prisma.order.findUnique({
        where: { id: orderId }
    });

    if (!order) throw createHttpError('Report não encontrado');

    // Busca o usuário pelo email do report
    const user = await prisma.user.findUnique({
        where: { email: order.email }
    });

    if (!user) throw createHttpError('Usuário não encontrado');

    // Só cria a notificação se o ADM que visualizou for diferente do usuário dono do report
    if (user.id !== admId) {
        await prisma.notification.create({
            data: {
                userId: user.id,            // Usuário dono do report
                triggeredById: admId,       // ADM que visualizou
                action: 'report_viewed',    // Ação customizada
            }
        });
    }
}

module.exports = { markAsViewedModel, generateNotifyReportViwed };