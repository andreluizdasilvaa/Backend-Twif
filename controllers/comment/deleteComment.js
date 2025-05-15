// controllers/comment/deleteComment.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.findUnique({ where: { id: parseInt(commentId) } });

    if (!comment) {
      return res.status(404).json({ error: 'Comentário não encontrado.' });
    }
    if (comment.postId !== parseInt(postId)) {
      return res.status(400).json({ error: 'Comentário não pertence a esse post.' });
    }
    if (comment.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar esse comentário.' });
    }

    await prisma.comment.delete({ where: { id: parseInt(commentId) } });

    res.json({ message: 'Comentário deletado com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteComment;
