import "./routes/index";
import "./utils/env.util";
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

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findByPk(id);
	done(null, user);
});