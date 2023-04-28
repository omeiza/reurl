/**
 * Authentication routes
 * Author: https://github.com/omeiza
 */

const express = require('express');
const userController = require("../controllers/users.controller");
const router = express.Router();

// Add new user
router.put('/signup', userController.signup);

// Add new user
router.post('/login', userController.login);

module.exports = router;