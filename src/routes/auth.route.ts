import express from "express";
import passport from "passport";
import { signup, login, loginSuccess, loginFailure } from "../controllers/auth.controller";

const router = express.Router();

router.put("/signup", signup);
router.post("/login", login);
router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailure);

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