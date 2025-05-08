const prisma = require('../../models/prisma');
const asyncHandler = require('../../utils/asyncHandler');
const createHttpError = require('http-errors');

const editUserController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { usernick, nome, nascimento, course, profilePicture, bio } = req.body;

    if (!usernick || !nome || !nascimento || !course) {
        throw createHttpError(400, 'Campos obrigatórios ausentes.');
    }

    try {
        // Modifique a parte de nascimento para:
const nascimentoISO = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                usernick,
                nome,
                nascimento: nascimentoISO, // Agora como string ISO
                course,
                profilePicture: profilePicture || null,
                bio: bio || null
            }
        });

        res.status(200).json({
            success: true,
            message: 'Perfil atualizado com sucesso!',
            user: updatedUser
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        
        // Verifica se é um erro de validação do Prisma
        if (error.message.includes('Invalid value provided')) {
            throw createHttpError(400, 'Formato de dados inválido');
        }
        
        throw createHttpError(500, 'Erro ao atualizar perfil');
    }
});

module.exports = editUserController;