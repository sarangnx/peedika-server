const express = require('express');

const Localbodies = require('../controllers/localbodies');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();

// add localbody
router.post('/add', jwtAuth, Localbodies.createLocalbody);

// get localbody by id
router.get('/localbody/:localbody_id', Localbodies.getLocalbodyById);

// List localbodies
router.get('/list', Localbodies.listLocalbodies);

// list districts
router.get('/districts', Localbodies.listDistricts);

// add store
router.post('/store/add', jwtAuth, Localbodies.addStore);

module.exports = router;
