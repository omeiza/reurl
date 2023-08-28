/**
 * Setup and middlewares application
 * Author: https://github.com/omeiza
 */

import * as openapi from "express-openapi-validator";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";

// Response error definition
interface ResponseError extends Error {
	status?: number;
	errors?: { path: string, message: string, errorCode: string }[]
}


// Express app
const app: Express = express();

// Session storage for passport
app.use(session({
	secret: 'palm-groove',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true }
}));

app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

// Cors
app.use(cors());

// OpenAPI validator
app.use(
	openapi.middleware({
		apiSpec: './spec/openapi.yaml',
		validateRequests: true,
		validateResponses: true,
		ignoreUndocumented: true
	}),
);

// Incoming request body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Reformat error in response
app.use((err: ResponseError, req: Request, res: Response) => {
	res.status(err.status || 500).json({
		status: err.message,
		errors: err.errors
	});
});

export default app;