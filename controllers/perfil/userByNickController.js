const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function userByNick(req, res, next) {
  try {
    const { usernick } = req.params;
    const currentUser = req.user;

    const isCurrentUser = currentUser.usernick === usernick;

    const user = await prisma.user.findUnique({
      where: {
        usernick
      },
      select: {
        nome: true,
        profilePicture: true,
        usernick: true,
        isadmin: true,
        nascimento: true,
        course: true, // <-- corrigido
        bio: true,
        posts: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            comments: true,
            likes: {
              select: {
                userId: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json({ user, isCurrentUser });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    next(error);
  }
}

module.exports = userByNick;
