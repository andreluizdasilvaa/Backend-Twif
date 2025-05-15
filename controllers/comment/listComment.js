// controllers/comment/listComment.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listComment = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Verifica se o post existe
    const post = await prisma.post.findUnique({ where: { id: parseInt(postId) } });
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }

    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, nome: true, usernick: true, profilePicture: true } } },
    });

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

module.exports = listComment;
