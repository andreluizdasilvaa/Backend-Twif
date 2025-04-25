const express = require('express');
 const router = express.Router();
 const { createSupportRequest } = require('../controllers/suporte/suporteController');
 
 // Defina a rota POST corretamente
 router.post('/support', createSupportRequest);
 
 module.exports = router;