/**
 * Authentication routes
 * Author: https://github.com/omeiza
 */

import { signup, login, loginSuccess, loginFailure } from "../controllers/auth.controller";
import express from "express";
import passport from "passport";
const router = express.Router();

// Add new user
router.put("/signup", signup);

// Log user in, and get API key
router.post("/login", login);

// For social: login success
router.get("/login/success", loginSuccess);

// For social: login failed
router.get("/login/failed", loginFailure);

/**
 * 1. GET google
 * 2. GET google callback
 */
router.get("/google",
	passport.authenticate("google", { scope: ["email", "profile"] }, () => { return null; })
);

router.get("/google/callback",
	passport.authenticate("google", {
		successRedirect: "/api/auth/login/success",
		failureRedirect: "/api/auth/login/failed"
	}, () => { return null; })
);

export default router;