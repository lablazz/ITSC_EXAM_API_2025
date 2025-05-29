const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const basicAuth = require('../middlewares/basicAuth');

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Search orders by keyword (admin only)
 *     description: Search orders by order number, first name, or last name. Requires Basic Authentication using credentials defined in environment variables.
 *     tags:
 *       - Admin - Orders
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search by (order number, first name, or last name)
 *         example: ORD12345
 *     responses:
 *       200:
 *         description: List of matching orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (missing or malformed keyword)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Keyword is required
 *       401:
 *         description: Unauthorized (invalid or missing Basic Auth credentials)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/admin/orders', basicAuth, adminController.searchOrders);

/**
 * @swagger
 * /admin/approve-orders:
 *   put:
 *     summary: Approve multiple orders by order numbers (admin only)
 *     description: Update the status of orders whose orderNumber is included in the provided array. Requires Basic Authentication.
 *     tags:
 *       - Admin - Orders
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderNumber
 *             properties:
 *               orderNumber:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of order numbers to approve
 *                 example: ["ORD-8dc5b82c", "ORD-a1b2c3d4"]
 *     responses:
 *       200:
 *         description: Orders approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "2 orders approved."
 *       400:
 *         description: Bad request - orderNumber must be a non-empty array
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: orderNumber must be a non-empty array.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 */
router.put('/admin/approve-orders', basicAuth, adminController.approveOrders);

module.exports = router;
