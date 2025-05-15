const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listPostsController(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { id: true, nome: true, usernick: true, profilePicture: true }
        },
        likes: true,
        comments: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    res.status(500).json({ error: 'Erro interno ao listar posts.' });
  }
}

module.exports = listPostsController;
