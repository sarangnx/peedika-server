const express = require('express');

const Ration = require('../controllers/ration');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


// Create new entry for ration.
router.post('/new', jwtAuth, Ration.createEntry);

// List entries
router.get('/list', jwtAuth, Ration.listEntries);

module.exports = router;
