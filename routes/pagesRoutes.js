const express = require('express');
const router = express.Router();
const { auth_user } = require('../middlewares');
const { validate } = require('../middlewares/validate');
const { userSchema } = require('../schemas/userSchemas');

const userMe = require('../controllers/perfil/userMeController');
const userByNick = require('../controllers/perfil/userByNickController');
const replaceAvatar = require('../controllers/perfil/replaceAvatarController');

router.get('/me', auth_user, userMe);
router.get('/perfil/:usernick', auth_user, userByNick);
router.patch('/troca/avatar/:avatar', auth_user, validate(userSchema.pick({ profilePicture: true })), replaceAvatar);

module.exports = router;
