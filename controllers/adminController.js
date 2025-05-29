const { Op } = require('sequelize');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

exports.searchOrders = async (req, res) => {
  try {
    const { keyword } = req.query;

    const orders = await Order.findAll({
      where: {
        [Op.or]: [
          { orderNumber: { [Op.like]: `%${keyword}%` } },
          { firstName: { [Op.like]: `%${keyword}%` } },
          { lastName: { [Op.like]: `%${keyword}%` } }
        ]
      },
      include: [OrderDetail]
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.approveOrders = async (req, res) => {
  try {
    const { orderNumber } = req.body;

    if (!Array.isArray(orderNumber) || orderNumber.length === 0) {
      return res.status(400).json({ message: 'orderNumber must be a non-empty array.' });
    }

    // Update orders where orderNumber IN [...], not id
    const [updatedCount] = await Order.update(
      { status: 'ยืนยันคำสั่งซื้อ' },
      { where: { orderNumber } } // Sequelize will treat this as IN clause if it's an array
    );

    return res.status(200).json({ message: `${updatedCount} orders approved.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
