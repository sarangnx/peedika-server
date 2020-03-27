/**
 * Order Routes
 */
const express = require('express');

const Order = require('../controllers/order');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


// Place a new Order.
router.post('/new', jwtAuth, Order.placeOrder);

// Cancel Order.
router.delete('/cancel/:order_id', jwtAuth, Order.cancelOrder);

// View Order.
router.get('/view', jwtAuth, Order.viewOrder);

// change order status
router.patch('/status', jwtAuth, Order.changeStatus);

// Get order stats
router.get('/stats', jwtAuth, Order.getStats);

// delete order
router.delete('/order/:order_id', jwtAuth, Order.deleteOrder);

module.exports = router;
