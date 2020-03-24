/**
 * Authentication routes.
 */

const express = require('express');

const AuthController = require('../controllers/auth');


const router = express.Router();

/***
 * Login route.
 * fields required: username, password.
 * value of username can be either email or phone number.
 * But the field name returned must be username.
 */
router.post('/login', AuthController.login);

// Register route
router.post('/register', AuthController.register);

// generate code for forgot password.
router.post('/forgot', AuthController.forgotPassword);

// Verify OTP code.
router.post('/verify', AuthController.verifyOTP);

// change password
router.post('/changepw', AuthController.changePassword);

module.exports = router;
