const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function likedPostOrNotController(req, res) {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    // Verifica se o post existe
    const post = await prisma.post.findUnique({ where: { id: parseInt(postId) } });
    if (!post) return res.status(404).json({ error: 'Post não encontrado.' });

    // Verifica se o usuário já curtiu o post
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: parseInt(postId),
        }
      }
    });

    if (like) {
      // Se já curtiu, remove o like (descurtir)
      await prisma.like.delete({
        where: { id: like.id }
      });
      return res.json({ message: 'Post descurtido.' });
    } else {
      // Se não curtiu, cria o like
      await prisma.like.create({
        data: {
          userId,
          postId: parseInt(postId),
        }
      });
      return res.json({ message: 'Post curtido.' });
    }
  } catch (error) {
    console.error('Erro ao curtir/descurtir post:', error);
    res.status(500).json({ error: 'Erro interno ao curtir/descurtir post.' });
  }
}

module.exports = likedPostOrNotController;
