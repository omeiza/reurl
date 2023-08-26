/**
 * Application bootstrap/start-point
 * Author: https://github.com/omeiza
 */

import passport from "passport";
import User from "./models/user.model";

require('./utils/env.util.js');
require("./routes/index");
const app = require("./app");
const models = require('./models');
const port = process.env.PORT ?? '4001';

(() => {
	try {
		models.sequelize
			.authenticate()
			.then(() => {
				console.log('Database connection has been established successfully');
				app.listen(port, () => {
					console.log(`URL Shortener app listening on port ${port}`);
				});
			});
	} catch (error) {
		console.error('Unable to connect to database -> ', error.original);
	}
})();

// Save user object to session
passport.serializeUser((user, done) => {
	done(null, user);
});

// Get user from session
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});