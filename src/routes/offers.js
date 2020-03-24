/**
 * Offer Routes
 */
const express = require('express');

const Offers = require('../controllers/offers');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


// Add a new offer.
router.post('/add', jwtAuth, Offers.addOffer);

// View Offers.
router.get('/view', jwtAuth, Offers.viewOffers);

// Deactivate offer
router.patch('/deactivate', jwtAuth, Offers.deactivateOffer);

// Delete Offer
router.delete('/delete', jwtAuth, Offers.deleteOffer);

// Suggest offers as a user starts typing.
router.get('/suggest', Offers.suggestOffers);

module.exports = router;
