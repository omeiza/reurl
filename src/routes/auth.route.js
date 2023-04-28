const express = require('express');
const userController = require("../controllers/users.controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");

/**
 * Authentication routes to their controllers
 */

// Add new user
router.put('/signup', userController.signup);

// Add new user
router.post('/login', userController.login);

module.exports = router;