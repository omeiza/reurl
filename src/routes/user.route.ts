/**
 * User routes
 * Author: https://github.com/omeiza
 */

import { get } from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate.middleware";
import express from "express";
const router = express.Router();

// Get authenticated user details
router.get('/:username', authenticate, get);

export default router;