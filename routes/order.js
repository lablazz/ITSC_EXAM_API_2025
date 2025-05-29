const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

router.post('/user/orders', auth, orderController.createOrder);

module.exports = router;