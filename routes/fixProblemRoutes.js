const express = require('express');
const router = express.Router();

const { auth_user, auth_admin } = require('../middlewares/index');

// Rota GET /fix-problem que retorna lista de problemas em JSON
router.get('/', auth_user, auth_admin, (req, res) => {
  // Aqui você pode buscar no banco de dados, por enquanto exemplo estático
  const problems = [
    { id: 1, title: 'Problema A', description: 'Descrição do problema A' },
    { id: 2, title: 'Problema B', description: 'Descrição do problema B' }
  ];

  res.json({ problems });
});

module.exports = router;
