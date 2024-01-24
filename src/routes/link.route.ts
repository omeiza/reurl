import express from "express";
import { links } from "../middlewares/authorize.middleware";
import { getMany, get, add, update, deleteLink } from "../controllers/link.controller";
import authenticate from "../middlewares/authenticate.middleware";

const router = express.Router();

router.get('/:id', get);
router.get('/', authenticate, getMany);
router.put('/', authenticate, add);
router.post('/:id', authenticate, links, update);
router.delete('/:id', authenticate, links, deleteLink);

export default router;