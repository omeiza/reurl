/**
 * Link routes
 * Author: https://github.com/omeiza
 */

const express = require('express');
const router = express.Router();
const linkController = require('../controllers/links.controller');
const authorize = require('../middlewares/authorize.middleware');
const authenticate = require('../middlewares/authenticate.middleware');

// Get links - which may includes query parameters for search, order, orderBy...
router.get('/', authenticate, linkController.getMany);

// Get specific short link
router.get('/:id', linkController.get);

// Create new short link
router.put('/', authenticate, linkController.add);

// Update short link
router.post('/:id', authenticate, authorize.links, linkController.update);

// Delete short link
router.delete('/:id', authenticate, authorize.links, linkController.delete);

module.exports = router;