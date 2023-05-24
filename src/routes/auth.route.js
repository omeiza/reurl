/**
 * Authentication routes
 * Author: https://github.com/omeiza
 */

const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Add new user
router.put('/signup', authController.signup);

// Log user in, and get API key
router.post('/login', authController.login);

module.exports = router;