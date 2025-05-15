// controllers/auth/loginController.js
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/jwt');
const { PrismaClient } = require('@prisma/client'); // Importando o Prisma Client
const prisma = new PrismaClient(); // Instanciando o Prisma Client


const loginController = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gera o token
    const token = generateToken(user.id);

    // Retorna o token com o perfil do usuário
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        usernick: user.usernick,
        profilePicture: user.profilePicture,
        isadmin: user.isadmin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
};

module.exports = loginController;
