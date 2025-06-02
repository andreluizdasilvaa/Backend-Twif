const prisma = require('../../models/prisma');

const validateEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ valid: false, msg: 'Email não fornecido.' });
    }

    // Verifica se é um e-mail institucional válido
    if (!/^[a-zA-Z0-9._%+-]+@(aluno\.ifsp\.edu\.br|ifsp\.edu\.br)$/.test(email)) {
        return res.status(400).json({ valid: false, msg: 'Email inválido. Use um e-mail do domínio ifsp.edu.br' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ valid: false, msg: 'Email já está em uso.' });
        }

        return res.status(200).json({ valid: true, msg: 'Email disponível e válido.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ valido: false, msg: 'Erro ao validar email.' });
    }
};

module.exports = validateEmail;
