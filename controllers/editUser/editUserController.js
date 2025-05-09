const prisma = require('../../models/prisma');
const asyncHandler = require('../../utils/asyncHandler');
const createHttpError = require('http-errors');

const editUserController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { usernick, nome, nascimento, course, profilePicture, bio } = req.body;

    // Cria um objeto de dados para atualização, onde os campos ausentes não são alterados
    const updateData = {};

    if (usernick) updateData.usernick = usernick;
    if (nome) updateData.nome = nome;
    if (nascimento) updateData.nascimento = new Date(nascimento).toISOString().split('T')[0];  // Formato ISO
    if (course) updateData.course = course;
    if (profilePicture) updateData.profilePicture = profilePicture;
    if (bio) updateData.bio = bio;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData, // Apenas os campos fornecidos serão atualizados
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
