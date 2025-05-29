const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  productNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT
});

module.exports = Product;