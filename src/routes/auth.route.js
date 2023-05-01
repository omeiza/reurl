/**
 * Authentication routes
 * Author: https://github.com/omeiza
 */

const express = require('express');
const authController = require("../controllers/auth.controller");
const router = express.Router();

// Add new user
router.put('/signup', authController.signup);

// Add new user
router.post('/login', authController.login);

module.exports = router;