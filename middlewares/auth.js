const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function auth_user(req, res, next) {
  let token;

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    token = req.cookies['your-session'];
  }

  if (!token) {
    return res.status(401).json({ 
      error: "Unauthorized", 
      message: "Acesso negado. Faça login para continuar." 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    if (!user) {
      return res.status(404).json({ 
        error: "User Not Found", 
        message: "Usuário não encontrado. Faça login novamente." 
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Erro na autenticação:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: "Token Inválido", 
        message: "Seu token não é válido ou expirou. Por favor, faça login novamente." 
      });
    }
    return res.status(500).json({ 
      error: "Internal Server Error", 
      message: "Ocorreu um erro ao verificar sua conta. Tente novamente mais tarde." 
    });
  }
}

module.exports = { auth_user };
