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
  },
  userId: {  // เพิ่ม userId เพื่อผูกกับ user
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shippingAddress: {  // เพิ่มที่อยู่จัดส่ง (สามารถเก็บเป็น TEXT ได้)
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

module.exports = Order;