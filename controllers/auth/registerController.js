const bcrypt = require('bcrypt');
const { generate_token_user } = require('../../middlewares/index');
const prisma = require('../../models/prisma');

// Rota de processamento do cadastro
const register = async (req, res) => {
    const { email, senha, usernick, nome, profilePicture, nascimento, curso } = req.body;

    let isadmin = false;

    // Validação do domínio do email
    if (/^[a-zA-Z0-9._%+-]+@aluno\.ifsp\.edu\.br$/.test(email)) {
        isadmin = false;
    } else if (/^[a-zA-Z0-9._%+-]+@ifsp\.edu\.br$/.test(email)) {
        isadmin = true;
    } else {
        return res.status(400).json({ msg: 'Email inválido. Use um e-mail do domínio ifsp.edu.br' });
    }

    try {
        const existingMail = await prisma.user.findUnique({ where: { email } });
        const existingUser = await prisma.user.findUnique({ where: { usernick } });

        if (existingMail || existingUser) {
            return res.status(400).json({ msg: 'Email ou @user já cadastrados!' });
        }

        const senhaHash = await bcrypt.hash(senha, parseInt(process.env.SALT_ROUNDS) || 8);

        const user = await prisma.user.create({
            data: {
                nome,
                email,
                usernick,
                senha: senhaHash,
                profilePicture,
                isadmin,
                nascimento,
                course: curso,
            }
        });

        // Gera token e envia junto com os dados do usuário
        generate_token_user(user, req, res, (token) => {
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
                    curso: user.course
                }
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Erro interno ao cadastrar usuário, entre em contato com o suporte' });
    }
};

module.exports = register;
