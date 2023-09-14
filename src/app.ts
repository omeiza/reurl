/**
 * Setup and middlewares application
 * Author: https://github.com/omeiza
 */

import "./utils/passport.util";
import * as openapi from "express-openapi-validator";
import path from "path";
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

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Template view directory
app.set('views', path.join(__dirname, 'views'));

// Template engine
app.set('view engine', 'pug');

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

export default app;