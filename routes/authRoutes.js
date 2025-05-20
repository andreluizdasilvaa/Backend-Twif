const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validate');
const { userSchema } = require('../schemas/userSchemas');

const loginController = require('../controllers/auth/loginController');
const registerController = require('../controllers/auth/registerController');
const removeSessionController = require('../controllers/auth/removeSessionController');
const validateEmailController = require('../controllers/auth/validateEmail');

router.post('/login', validate(userSchema.pick({ email: true, senha: true })), loginController);
router.post('/register', validate(userSchema), registerController);
router.delete('/logout', removeSessionController);

router.post('/validar-email', validateEmailController);

module.exports = router;
