/**
 * User routes
 * Author: https://github.com/omeiza
 */

import express from "express";
import { get } from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate.middleware";

const router = express.Router();

// Get authenticated user details
router.get('/:username', authenticate, get);

export default router;