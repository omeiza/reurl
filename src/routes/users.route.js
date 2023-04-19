/**
 * User routes to their controllers
 * Author: https://github.com/omeiza
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.put('/', userController.signup);

module.exports = router;