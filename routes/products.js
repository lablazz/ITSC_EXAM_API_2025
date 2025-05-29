const express = require('express');
const router = express.Router();
const Product = require('../models/Product');  // adjust path if needed

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Fetch a list of all available products.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   productNumber:
 *                     type: string
 *                     example: P001
 *                   name:
 *                     type: string
 *                     example: Example Product
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *                   description:
 *                     type: string
 *                     example: A great product
 *       500:
 *         description: Server error fetching products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error fetching products
 */

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
