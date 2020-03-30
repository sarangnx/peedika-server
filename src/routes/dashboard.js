const express = require('express');

const Dashboard = require('../controllers/dashboard');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


router.get('/about', Dashboard.about);

module.exports = router;
