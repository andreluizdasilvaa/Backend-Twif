const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPostController(req, res) {
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Conteúdo do post não pode ser vazio.' });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        userId: req.user.id
      }
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro interno ao criar post.' });
  }
}

module.exports = createPostController;
