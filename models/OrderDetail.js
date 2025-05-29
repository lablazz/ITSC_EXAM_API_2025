const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const Product = require('./Product');

const OrderDetail = sequelize.define('OrderDetail', {
  productName: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT
});

Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Product, { foreignKey: 'productNumber', targetKey: 'productNumber' });

module.exports = OrderDetail;