/**
 * User routes
 * Author: https://github.com/omeiza
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const authenticate = require('../middlewares/authenticate.middleware');

// Get authenticated user details
router.get('/:username', authenticate, userController.get);

module.exports = router;