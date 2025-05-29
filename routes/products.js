const express = require('express');
const router = express.Router();
const Product = require('../models/Product');  // adjust path if needed

router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

module.exports = router;
