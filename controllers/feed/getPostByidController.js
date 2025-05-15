// controllers/posts/getPostByIdController.js
const { PrismaClient } = require('@prisma/client'); // Importando o Prisma Client
const prisma = new PrismaClient(); // Instanciando o Prisma Client


const getPostById = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    if (isNaN(postId)) {
      return res.status(400).json({ msg: 'ID do post inválido.' });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            usernick: true,
            profilePicture: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ msg: 'Post não encontrado.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro interno ao buscar post.' });
  }
};

module.exports = getPostById;
