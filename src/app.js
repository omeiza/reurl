/**
 * Setup and middlewares application
 * Date: 24/05/2023
 * Author: https://github.com/omeiza
 */

const openAPIValidator = require("express-openapi-validator");
const express = require("express");
const app = express();
const passport = require("passport");
const authController = require("./controllers/auth.controller");
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require("express-session");
const twitterStrategy = require("passport-twitter").Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;

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
	openAPIValidator.middleware({
		apiSpec: '../spec/openapi.yaml',
		validateRequests: true,
		validateResponses: true,
		ignoreUndocumented: true
	}),
);

// Incoming request body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport: Twitter Strategy
passport.use("twitter",
	new twitterStrategy({
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
			userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
			callbackURL: process.env.TWITTER_CALLBACK_URL
		},
		authController.twitter
	)
);

// Passport: Google Strategy
passport.use("google",
	new googleStrategy({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		authController.google
	)
);

// Save user object to session
passport.serializeUser((user, done) => {
	done(null, user);
});

// Get user from session
passport.deserializeUser((user, done) => {
	done(null, user);
});

// Reformat error in response
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		status: err.message,
		errors: err.errors
	});
});

module.exports = app;