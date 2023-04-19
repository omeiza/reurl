/**
 * Link routes to their controllers
 * Author: https://github.com/omeiza
 */

const express = require('express');
const router = express.Router();
const linkController = require('../controllers/links.controller');

/**
 * Get user links
 * @TODO: Setup middleware to ensure authentication and authorization
 */
router.get('/', linkController.getMultipleLinks);

/**
 * Get specific link
 * @TODO: Setup middleware to ensure authentication and authorization
 */
router.get('/:id', linkController.getLink);

/**
 * Create new link
 * @TODO: Setup middleware to ensure authentication and authorization
 */
router.put('/', linkController.createLink);

module.exports = router;