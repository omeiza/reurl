/**
 * Get new instance Sequelize ORM object - to be used across the application
 * Author: https://github.com/omeiza
 */

import app from "../app";
import Link from "./link.route";
import Auth from "./auth.route";
import User from "./user.route";
import { Request, Response } from "express";

app.use('/users', User);
app.use('/links', Link);
app.use('/auth', Auth);
app.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'URL Shortener API... 😉'
	})
});