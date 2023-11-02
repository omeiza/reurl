import { Request, Response } from "express";
import app from "../app";
import Auth from "./auth.route";
import User from "./user.route";
import Link from "./link.route";

app.get('/', (req: Request, res: Response) => {
	res.render('index', { title: 'Hey', message: 'Hello there!' });
});

// app.use('/auth', Auth);
// app.use('/users', User);
// app.use('/links', Link);