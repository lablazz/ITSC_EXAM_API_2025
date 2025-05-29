// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,  // ไม่ให้ซ้ำกัน (unique index)
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneEncrypted: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
