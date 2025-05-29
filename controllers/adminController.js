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
