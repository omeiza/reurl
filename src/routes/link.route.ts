/**
 * Link routes
 * Author: https://github.com/omeiza
 */

import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authenticate.middleware";
import { links } from "../middlewares/authorize.middleware";
import { getMany, get, add, update, deleteLink } from "../controllers/link.controller";

// Get links - which may includes query parameters for search, order, orderBy...
router.get('/', authenticate, getMany);

// Get specific short link
router.get('/:id', get);

// Create new short link
router.put('/', authenticate, add);

// Update short link
router.post('/:id', authenticate, links, update);

// Delete short link
router.delete('/:id', authenticate, links, deleteLink);

export default router;