import express from "express";
import { get } from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate.middleware";

const router = express.Router();

router.get('/:username', authenticate, get);

export default router;