const express = require('express');
const router = express.Router();
const { getImage } = require('../controllers/perfil/imageController.js');

// Exibir imagem (tanto padrão quanto de usuários)
router.get('/:usernick', getImage);

module.exports = router;