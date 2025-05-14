const express = require('express');
const router = express.Router();

const { auth_user } = require('../middlewares/index');
const editUserController = require('../controllers/editUser/editUserController');

router.put('/usuario/editar', auth_user, editUserController);

module.exports = router;