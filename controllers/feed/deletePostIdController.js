const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deletePostIdController(req, res) {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(postId) } });

    if (!post) return res.status(404).json({ error: 'Post não encontrado.' });
    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar este post.' });
    }

    await prisma.post.delete({ where: { id: parseInt(postId) } });

    res.json({ message: 'Post deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    res.status(500).json({ error: 'Erro interno ao deletar post.' });
  }
}

module.exports = deletePostIdController;
