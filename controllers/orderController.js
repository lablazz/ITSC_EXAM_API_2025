const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { firstName, lastName, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    const orderNumber = `ORD-${uuidv4().split('-')[0]}`;

    const order = await Order.create({
      orderNumber,
      firstName,
      lastName,
      status: 'รอยืนยันคำสั่งซื้อ'
    });

    for (const item of items) {
      const product = await Product.findOne({ where: { productNumber: item.productNumber } });
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productNumber} not found` });
      }

      await OrderDetail.create({
        orderId: order.id,
        productNumber: item.productNumber,
        quantity: item.quantity,
        price: product.price
      });
    }

    return res.status(201).json({
      message: 'Order created successfully',
      orderNumber: order.orderNumber
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};