const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * /user/orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order with items. Requires Bearer token authentication.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - items
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: ทดสอบ
 *               lastName:
 *                 type: string
 *                 example: ทดสอบ
 *               items:
 *                 type: array
 *                 description: Array of order items
 *                 items:
 *                   type: object
 *                   required:
 *                     - productNumber
 *                     - quantity
 *                   properties:
 *                     productNumber:
 *                       type: string
 *                       example: P001
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order created successfully
 *                 orderNumber:
 *                   type: string
 *                   example: ORD-8dc5b82c
 *       400:
 *         description: Bad request (e.g., missing items)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Items are required
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product P001 not found
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
router.post('/user/orders', auth, orderController.createOrder);

/**
 * @swagger
 * /user/orders/{orderNumber}:
 *   put:
 *     summary: Update order items by order number
 *     description: Update the items of an existing order. Replaces all previous order details with the new list of items. Requires Bearer token authentication.
 *     tags:
 *       - User - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The order number to update
 *         example: ORD-8dc5b82c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 description: Array of order items to update
 *                 items:
 *                   type: object
 *                   required:
 *                     - productNumber
 *                     - quantity
 *                   properties:
 *                     productNumber:
 *                       type: string
 *                       example: P001
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order updated successfully
 *       400:
 *         description: Bad request (no items or no valid products)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No valid products found in items
 *       404:
 *         description: Order not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not found or not yours
 *       500:
 *         description: Error updating order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating order
 *                 error:
 *                   type: string
 */
router.put('/user/orders/:orderNumber', auth, orderController.updateOrder);

/**
 * @swagger
 * /user/orders/{orderNumber}/confirm:
 *   put:
 *     summary: Confirm an order with shipping address
 *     description: Confirm an existing order by setting the shipping address and updating the status to confirmed. Requires Bearer token authentication.
 *     tags:
 *       - User - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Order number to confirm
 *         example: ORD-8dc5b82c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 example: "123 หมู่บ้านสุขใจ ถนนสุขสมบูรณ์ เขตมีความสุข กทม. 10300"
 *     responses:
 *       200:
 *         description: Order confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order confirmed successfully
 *       400:
 *         description: Order is already confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order is already confirmed
 *       404:
 *         description: Order not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not found or not yours
 *       500:
 *         description: Error confirming order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error confirming order
 */

router.put('/user/orders/:orderNumber/confirm', auth, orderController.confirmOrder);

module.exports = router;
