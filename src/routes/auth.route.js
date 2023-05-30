/**
 * Authentication routes
 * Author: https://github.com/omeiza
 */

const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Add new user
router.put("/signup", authController.signup);

// Log user in, and get API key
router.post("/login", authController.login);

// For social: login success
router.get("/login/success", authController.loginSuccess);

// For social: login failed
router.get("/login/failed", authController.loginFailed);

/**
 * 1. GET twitter
 * 2. GET twitter callback
 */
router.get("/twitter",
	passport.authenticate("twitter", { scope: ["profile"] }, () => { return null; })
);

router.get("/twitter/callback",
	passport.authenticate("twitter", {
		successRedirect: "/api/auth/login/success",
		failureRedirect: "/api/auth/login/failed"
	}, () => { return null; })
);

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

module.exports = router;