// controllers/comment/createComment.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createComment(postId, content, userId) {
  // Verifica se o post existe
  const post = await prisma.post.findUnique({ where: { id: parseInt(postId) } });
  if (!post) {
    const error = new Error('Post não encontrado.');
    error.status = 404;
    throw error;
  }

  // Cria o comentário
  const comment = await prisma.comment.create({
    data: {
      content,
      postId: parseInt(postId),
      userId,
    },
  });

  return comment;
}

module.exports = createComment;
