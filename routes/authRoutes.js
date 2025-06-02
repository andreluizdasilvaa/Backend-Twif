const express = require('express');
const router = express.Router();

const { auth_user } = require('../middlewares/index');

const validateController = require('../controllers/auth/validateController')
const loginController = require('../controllers/auth/loginController');
const registerController = require('../controllers/auth/registerController');
const removeSessionController = require('../controllers/auth/removeSessionController');
const validateEmailController = require('../controllers/auth/validateEmail');
const validateUserNick = require('../controllers/auth/validateUserNick')

router.get('/validate', auth_user, validateController);
router.post('/login', loginController);
router.post('/register', registerController);
router.delete('/logout', removeSessionController);

router.post('/validate-email', validateEmailController);
router.post('/validate-usernick', validateUserNick)

module.exports = router;
