/**
 * User Routes
 */
const express = require('express');

const Users = require('../controllers/users');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


// Get profile of a user using user_id.
router.get('/profile/:user_id', jwtAuth, Users.getUserProfile);

// Edit user profile.
router.patch('/profile', jwtAuth, Users.editUserProfile);

// Edit or add user address.
router.patch('/profile/address', jwtAuth, Users.editUserAddress);

// Get all profiles
router.get('/profiles', jwtAuth, Users.getUserProfiles);

module.exports = router;
