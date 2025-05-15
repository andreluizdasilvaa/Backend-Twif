// models/comment/deleteCommentModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteCommentModel = async (commentId, userId, isAdmin) => {
  // Verifica se o comentário existe
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error('Comentário não encontrado');
  }

  // Verifica se o usuário é o dono do comentário ou administrador
  if (comment.userId !== userId && !isAdmin) {
    throw new Error('Você não tem permissão para deletar este comentário');
  }

  // Deleta o comentário
  await prisma.comment.delete({
    where: { id: commentId },
  });

  // Deletar a notificação relacionada ao comentário (se necessário)
  // Exemplo: await prisma.notification.deleteMany({ where: { commentId: commentId } });

  return;
};

module.exports = deleteCommentModel;
