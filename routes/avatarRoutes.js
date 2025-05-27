const express = require('express');
const router = express.Router();

router.patch('/troca/avatar/:usuarioId', (req, res) => {
  res.json({ message: 'Avatar atualizado para o usuário ' + req.params.usuarioId });
});

module.exports = router;
