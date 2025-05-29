// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('รอยืนยันคำสั่งซื้อ', 'ยืนยันคำสั่งซื้อ'),
    defaultValue: 'รอยืนยันคำสั่งซื้อ'
  }
});

module.exports = Order;
