/**
 * Store routes.
 */

const express = require('express');

const Store = require('../controllers/store');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();

/**
 * Create new Store.
 * Adds new record to store table in database.
 * Only store details is added. Store owner details
 * must be added prior to this method.
 */
router.post('/new/store', jwtAuth, Store.createNewStore);

/**
 * Create a new Store Owner.
 * Add a new record to users table, ownerDetails table,
 * and storeOwner junction table.
 * Owner should be created before creating a store.
 */
router.post('/new/owner', jwtAuth, Store.createNewOwner);

/**
 * Edit store details.
 * All or any of the fields can be editted using this
 * single route.
 */
router.post('/edit/store/:store_id', jwtAuth, Store.editStore);

/**
 * Edit Owner details.
 */
router.post('/edit/owner/:owner_id', jwtAuth, Store.editOwner);

/**
 * View Details of a store, using the store id.
 */
router.get('/view/store/:store_id', jwtAuth, Store.viewStore)

/**
 * View Owner profile, using owner details
 */
router.get('/view/owner/:owner_id', jwtAuth, Store.viewOwner);

// Get stats to display in the dashboard
router.get('/dashboard', jwtAuth, Store.dashBoard);

module.exports = router;
