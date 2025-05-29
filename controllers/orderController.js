const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
// const { Order, OrderDetail, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { firstName, lastName, items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    const orderNumber = `ORD-${uuidv4().split('-')[0]}`;

    const order = await Order.create({
      orderNumber,
      firstName,
      lastName,
      status: 'รอยืนยันคำสั่งซื้อ',
      userId
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
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.updateOrder = async (req, res) => {
  const { orderNumber } = req.params;
  const { items } = req.body; // items = [{ productNumber, quantity }]

  try {
    const order = await Order.findOne({
      where: { orderNumber }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not yours' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided for update' });
    }

    // Check if at least one product exists
    const validItems = [];
    for (const item of items) {
      const product = await Product.findOne({ where: { productNumber: item.productNumber } });
      if (product) {
        validItems.push({
          orderId: order.id,
          productNumber: item.productNumber,
          quantity: item.quantity
        });
      }
    }

    if (validItems.length === 0) {
      return res.status(400).json({ message: 'No valid products found in items' });
    }

    // Remove old order details
    await OrderDetail.destroy({ where: { orderId: order.id } });

    // Create new valid order details
    await OrderDetail.bulkCreate(validItems);

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order', error });
  }
};

exports.confirmOrder = async (req, res) => {
  const { orderNumber } = req.params;
  const { shippingAddress } = req.body;

  try {
    const order = await Order.findOne({
      where: { orderNumber, userId: req.user.id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not yours' });
    }

    // ป้องกันการยืนยันซ้ำ
    if (order.status === 'ยืนยันคำสั่งซื้อ') {
      return res.status(400).json({ message: 'Order is already confirmed' });
    }

    order.shippingAddress = shippingAddress;
    order.status = 'ยืนยันคำสั่งซื้อ';
    await order.save();

    res.json({ message: 'Order confirmed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming order' });
  }
};