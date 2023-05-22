const app = require("./../app");
const redisClient = require("redis.util");
const session = require("express-session");
const passport = require("passport");
const twitterStrategy = require("passport-twitter").Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;

// Passport INIT
app.use(session({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());