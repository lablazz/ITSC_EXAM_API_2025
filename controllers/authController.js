const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const User = require('../models/User');
const { encryptPhone } = require('../utils/crypto');
const { hashPassword, comparePassword } = require('../utils/hash');

exports.register = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, password, confirmPassword } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ message: 'email, firstName, lastName are required' });
    }

    if (password && password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password do not match' });
    }

    // ตรวจสอบ email ซ้ำ
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use' });
    }

    // เข้ารหัสเบอร์โทรถ้ามี
    const phoneEncrypted = encryptPhone(phone);

    // Hash password ถ้ามี
    const passwordHash = password ? await hashPassword(password) : null;

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      phoneEncrypted,
      passwordHash,
    });

    return res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', err: err });
  }
};