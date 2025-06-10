const express = require('express');
const router = express.Router();

const getAllOrdersController = require('../controllers/suport/getAllOrdersController.js')
const submitOrderController = require('../controllers/suport/submitOrderController')

const { auth_user, auth_admin } = require('../middlewares/index');

router.get('/', auth_user, auth_admin, getAllOrdersController);

router.post('/create', auth_user, submitOrderController)

module.exports = router;
