const path = require('path');
const fs = require('fs').promises;
const asyncHandler = require('../../utils/asyncHandler');
const createHttpError = require('http-errors');

const getAllImages = asyncHandler(async (req, res) => {
    const defaultsDir = path.join(__dirname, '../../uploads/defaults');
    let files;
    try {
        files = await fs.readdir(defaultsDir);
    } catch (err) {
        throw createHttpError(500, 'Erro ao listar imagens padrão');
    }
    const images = files.map(filename => ({
        filename,
        url: `/image/default/${filename}`
    }));
    res.json({ images });
});

module.exports = getAllImages;