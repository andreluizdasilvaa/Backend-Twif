const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchPostIdController(req, res) {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: {
        user: true,
        comments: true,
        likes: true
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }
    res.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ error: 'Erro interno ao buscar post.' });
  }
}

module.exports = searchPostIdController;
