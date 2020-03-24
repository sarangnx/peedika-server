/**
 * Notifications
 */
const express = require('express');

const Notifications = require('../controllers/notifications');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();

router.post('/send', jwtAuth, Notifications.send);

module.exports = router;
