const express = require('express');
const router = express.Router();

const getAllOrdersController = require('../controllers/suport/getAllOrdersController.js')
const submitOrderController = require('../controllers/suport/submitOrderController.js')
const markAsViewedController = require('../controllers/suport/markAsViewedController.js')
const deleteReportController = require('../controllers/suport/deleteReportController.js')

const { auth_user, auth_admin } = require('../middlewares/index');

router.get('/', auth_user, auth_admin, getAllOrdersController);

router.post('/create', auth_user, submitOrderController);

router.patch('/mark/viewed', auth_user, auth_admin, markAsViewedController);

router.delete('/delete', auth_user, auth_admin, deleteReportController);

module.exports = router;
