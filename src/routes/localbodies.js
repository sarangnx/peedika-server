const express = require('express');

const Localbodies = require('../controllers/localbodies');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();

// add localbody
router.post('/add', jwtAuth, Localbodies.createLocalbody);

// get localbody by id
router.get('/localbody/:localbody_id', jwtAuth, Localbodies.getLocalbodyById);

module.exports = router;
