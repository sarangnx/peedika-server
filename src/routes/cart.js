/**
 * Cart Routes
 */
const express = require('express');

const Cart = require('../controllers/cart');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


// Add a new item to cart.
router.post('/add', jwtAuth, Cart.addToCart);

router.patch('/edit', jwtAuth, Cart.editCartItem);

// Remove items from cart.
router.delete('/:cart_id/item/:item_id', jwtAuth, Cart.removeFromCart);

// View Items in cart.
router.get('/view', jwtAuth, Cart.viewCart);

// Return number of items in the cart of a user.
router.get('/count', jwtAuth, Cart.count);

// Move items from cart to order.
router.post('/checkout', jwtAuth, Cart.checkout);

module.exports = router;
