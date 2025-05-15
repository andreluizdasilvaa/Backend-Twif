const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../schemas/userSchemas');  // Corrigir importação

const loginController = require('../controllers/auth/loginController');
const registerController = require('../controllers/auth/registerController');
const removeSessionController = require('../controllers/auth/removeSessionController');

// Crie um novo schema apenas com os campos necessários para o login
router.post('/login', validate(loginSchema), loginController);  // Usando loginSchema
router.post('/register', validate(registerSchema), registerController);  // Usando registerSchema
router.delete('/logout', removeSessionController);

module.exports = router;
