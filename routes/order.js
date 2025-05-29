const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

router.post('/user/orders', auth, orderController.createOrder);
router.put('/user/orders/:orderNumber', auth, orderController.updateOrder);

// เพิ่ม route สำหรับ confirm order (PUT)
router.put('/user/orders/:orderNumber/confirm', auth, orderController.confirmOrder);

module.exports = router;
