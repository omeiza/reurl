import { Request, Response } from "express";
import app from "../app";

app.get('/', (req: Request, res: Response) => {
	res.render('index', { title: 'Hey', message: 'Hello there!' });
});