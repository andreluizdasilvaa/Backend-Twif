const path = require('path');
const fs = require('fs');
const asyncHandler = require('../../utils/asyncHandler');
const searchUserByidModel = require('../../models/perfil/searchUserByidModel')
const createHttpError = require('http-errors');

const getImage = asyncHandler(async (req, res) => {
    const usernick = req.params.usernick;

    // Verifica se o usuário existe no banco de dados
    const user = await searchUserByidModel(usernick)

    const filename = user.profilePicture; // Nome da imagem de perfil do usuário
    const isDefaultImage = user.imageDefault; // Verifica se é imagem padrão

    let imagePath;

    if (isDefaultImage) {
      // Se for uma imagem padrão, buscamos na pasta /uploads/defaults
      imagePath = path.join(__dirname, '../../uploads/defaults', filename);
    } else {
      // Se for uma imagem personalizada, buscamos na pasta /uploads
      imagePath = path.join(__dirname, '../../uploads', filename);
    }

    // Verifica se a imagem existe no caminho especificado
    if (fs.existsSync(imagePath)) {
      // Se a imagem existe, envia ela como resposta
      return res.sendFile(imagePath);
    } else {
      // Se a imagem não for encontrada, retorna erro 404
      throw createHttpError(404, 'Imagem não encontrada')
    }
});

module.exports = { getImage };
