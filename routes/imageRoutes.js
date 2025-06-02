const express = require('express');
const router = express.Router();

const getImage = require('../controllers/images/imageController.js');
const getAllImages = require('../controllers/images/getAllDefaultImagesController.js')

// Exibir todas as imagens padrão salvas
router.get('/', getAllImages);

// Exibir imagem (tanto padrão quanto de usuários)
router.get('/:usernick', getImage);

module.exports = router;