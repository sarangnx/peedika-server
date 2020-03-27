const express = require('express');

const Localbodies = require('../controllers/localbodies');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();

// add localbody
router.post('/add', jwtAuth, Localbodies.createLocalbody);

module.exports = router;
