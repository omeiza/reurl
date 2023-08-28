/**
 * User routes
 * Author: https://github.com/omeiza
 */

import express from "express";
const router = express.Router();
import { get } from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate.middleware";

// Get authenticated user details
router.get('/:username', authenticate, get);

module.exports = router;