// controllers/auth/registerController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { registerSchema } = require('../../schemas/userSchemas');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    // Validação com Zod
    const data = registerSchema.parse(req.body);

    // Verifica se o usuário ou email já existem
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { usernick: data.usernick }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ msg: 'Email ou usernick já cadastrados.' });
    }

    // Verifica se o e-mail é institucional do IFSP
    const alunoRegex = /^[a-zA-Z0-9._%+-]+@aluno\.ifsp\.edu\.br$/;
    const adminRegex = /^[a-zA-Z0-9._%+-]+@ifsp\.edu\.br$/;

    if (!alunoRegex.test(data.email) && !adminRegex.test(data.email)) {
      return res.status(400).json({ msg: 'O e-mail deve ser institucional (@aluno.ifsp.edu.br ou @ifsp.edu.br).' });
    }

    // Define se o usuário é administrador com base no domínio
    const isadmin = adminRegex.test(data.email) && !data.email.includes('aluno');

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(data.senha, 10);

    // Criação do usuário no banco
    const user = await prisma.user.create({
      data: {
        ...data,
        senha: senhaHash,
        isadmin
      }
    });

    // Geração do token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, isadmin: user.isadmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Retorno de sucesso
    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        usernick: user.usernick,
        profilePicture: user.profilePicture,
        isadmin: user.isadmin,
        nascimento: user.nascimento,
        curso: user.curso
      }
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ msg: 'Dados inválidos.', errors: error.errors });
    }

    console.error('Erro no registro de usuário:', error);
    return res.status(500).json({ msg: 'Erro interno ao cadastrar usuário.', error: error.message });
  }
};

module.exports = register;
