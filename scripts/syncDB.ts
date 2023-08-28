/**
 * Sync in all models to create and update databases
 * Author: https://github.com/omeiza
 * @TODO:
 * 1. Exit process after running script
 * 2. Allow drop database to drop all tables in database
 */

require('../src/utils/env.util');
import User from "../src/models/user.model";
import Link from "../src/models/link.model";
import AuthService from "../src/models/authService.model";

(async () => {
	try {
		/**
		 * 1. Sync (Create or Update) in User model
		 * 2. Sync (Create or Update) in AuthService model
		 * 3. Setup model associations between User & AuthService
		 */
		await User.sync({ alter: true });
		await AuthService.sync({ alter: true })
			.then(() => {
				User.hasOne(AuthService);
				AuthService.belongsTo(User);
			});

		/**
		 * 1. Sync (Create or Update) in Link model
		 * 2. Setup model association between Link & User
		 */
		await Link.sync({ alter: true })
			.then(async() => {
				User.hasMany(Link);
				Link.belongsTo(User);
			});

		console.log("Database tables successfully synced in!");
	} catch (error) {
		console.log("Error syncing databases tables", error);
	}
})();