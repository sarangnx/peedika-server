/**
 * Stocks Routes
 */
const express = require('express');

const Stocks = require('../controllers/stocks');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


// Add new stocks
router.post('/add', jwtAuth, Stocks.addStocks);

// Edit details of an existing stock
router.patch('/edit', jwtAuth, Stocks.editStocks);

// Delete details of a stock
router.delete('/:stock_id', jwtAuth, Stocks.deleteStocks);

// Mark stock as expired (soft delete stock)
router.patch('/expire/:stock_id', jwtAuth, Stocks.deleteStocks);

// get all stocks
router.get('/all', jwtAuth, Stocks.getAllStocks);

// get details of a single stock
router.get('/:stock_id', jwtAuth, Stocks.getOneStock);

module.exports = router;
