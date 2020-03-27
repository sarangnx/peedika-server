const express = require('express');

const Localbodies = require('../controllers/localbodies');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();

// add localbody
router.post('/add', jwtAuth, Localbodies.createLocalbody);

// get localbody by id
router.get('/localbody/:localbody_id', jwtAuth, Localbodies.getLocalbodyById);

// List localbodies
router.get('/list', jwtAuth, Localbodies.listLocalbodies);

module.exports = router;
