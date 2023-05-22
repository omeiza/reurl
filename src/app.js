const bodyParser = require('body-parser');
const cors = require('cors');
const openAPIValidator = require("express-openapi-validator");
const session = require("express-session");
const passport = require("passport");
const twitterStrategy = require("passport-twitter").Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
const authController = require("./controllers/auth.controller");
const express = require("express");
const app = express();

// Passport INIT
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

// Add OpenAPI to express app
app.use(
	openAPIValidator.middleware({
		apiSpec: '../spec/openapi.yaml',
		validateRequests: true,
		validateResponses: true,
		ignoreUndocumented: true
	}),
);

// Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Twitter Auth
passport.use("twitter",
	new twitterStrategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
		callbackURL: process.env.TWITTER_CALLBACK_URL
		}, authController.twitter
	)
);

// Google Auth
passport.use("google",
	new googleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URL,
		}, authController.google
	)
);

// More Passport JS
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

// Error handling with express app middleware
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		status: err.message,
		errors: err.errors
	});
});

module.exports = app;