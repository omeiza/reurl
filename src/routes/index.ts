/**
 * Get new instance Sequelize ORM object - to be used across the application
 * Author: https://github.com/omeiza
 */

import { Request, Response } from "express";
import app from "../app";
import Auth from "./auth.route";
import User from "./user.route";
import Link from "./link.route";

app.get('/', (req: Request, res: Response) => { res.json({ message: 'URL Shortener API... 😉' }) });
app.use('/auth', Auth);
app.use('/users', User);
app.use('/links', Link);