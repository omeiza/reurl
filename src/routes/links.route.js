/**
 * Link routes to their controllers
 * Author: https://github.com/omeiza
 */

const express = require('express');
const router = express.Router();
const linkController = require('../controllers/links.controller');
const authenticate = require('../middlewares/authenticate.middleware');
const authorize = require('../middlewares/authorize.middleware');

// Get links
router.get('/', authenticate, linkController.getMultipleLinks);

// Get specific link
router.get('/:id', linkController.getLink);

// Create new link
router.put('/', authenticate, linkController.addLink);

// Update link
router.post('/:id', [authenticate, authorize.links], linkController.updateLink);

// Delete link
router.delete('/:id', [authenticate, authorize.links], linkController.deleteLink);

module.exports = router;