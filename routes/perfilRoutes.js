const express = require('express');
const router = express.Router();

const { auth_user } = require('../middlewares/index.js');

const userMe = require('../controllers/perfil/userMeController');
const userByNick = require('../controllers/perfil/userByNickController');
const replaceAvatar = require('../controllers/perfil/replaceAvatarController');
const userNotifications = require('../controllers/perfil/userNotificationsController.js');
const markNotificationsRead = require('../controllers/perfil/markNotificationsReadController');

// retornar todas as informações do usuario que está acessando a rota
router.get('/me', auth_user, userMe);

// retorna as notificações do usuario que acessou a rota
router.get('/notifications', auth_user, userNotifications);

// marca as notificações como lidas
router.patch('/notifications/read', auth_user, markNotificationsRead);

// Rota para acessar o perfil pelo usernick
router.get('/perfil/:usernick', auth_user, userByNick);

// Troca de avatar
router.patch('/troca/avatar/:avatar', auth_user, replaceAvatar);

module.exports = router;