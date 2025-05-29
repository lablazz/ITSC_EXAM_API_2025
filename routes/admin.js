const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const basicAuth = require('../middlewares/basicAuth');

router.get('/admin/orders', basicAuth, adminController.searchOrders);

router.put('/admin/approve-orders', basicAuth, adminController.approveOrders);

module.exports = router;
