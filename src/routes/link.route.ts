/**
 * Link routes
 * Author: https://github.com/omeiza
 */

import express from "express";
import { links } from "../middlewares/authorize.middleware";
import { getMany, get, add, update, deleteLink } from "../controllers/link.controller";
import authenticate from "../middlewares/authenticate.middleware";

const router = express.Router();

// Get specific short link
router.get('/:id', get);

// Get links - which may includes query parameters for search, order, orderBy...
router.get('/', authenticate, getMany);

// Create new short link
router.put('/', authenticate, add);

// Update short link
router.post('/:id', authenticate, links, update);

// Delete short link
router.delete('/:id', authenticate, links, deleteLink);

export default router;