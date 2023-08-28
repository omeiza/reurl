/**
 * Application bootstrap/start-point
 * Author: https://github.com/omeiza
 */

require("./routes/index");
require('./utils/env.util.js');
import app from "./app";
import models from "./models";
import passport from "passport";
import User from "./models/user.model";

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
		console.error('Unable to connect to database -> ', error);
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