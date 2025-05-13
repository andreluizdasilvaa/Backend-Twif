const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    console.log("🟡 Dados recebidos no login:", { email, senha });

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gera token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isadmin: user.isadmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log("✅ Login bem-sucedido! Token gerado.");

    // Retorna o token e dados básicos
    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        usernick: user.usernick,
        isadmin: user.isadmin,
        profilePicture: user.profilePicture
      }
    });

  } catch (error) {
    console.error("❌ Erro no login:", error);
    next(error);
  }
};
