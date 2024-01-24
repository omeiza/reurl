import "./utils/passport.util";
import * as openapi from "express-openapi-validator";
import path from "path";
import express, { Express } from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";

interface ResponseError extends Error {
	status?: number;
	errors?: { path: string, message: string, errorCode: string }[]
}

const app: Express = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'palm-groove',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true }
}));

app.use(passport.initialize(undefined));
app.use(passport.session(undefined));
app.use(cors());
app.use(
	openapi.middleware({
		apiSpec: './spec/openapi.yaml',
		validateRequests: true,
		validateResponses: true,
		ignoreUndocumented: true
	}),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

export default app;