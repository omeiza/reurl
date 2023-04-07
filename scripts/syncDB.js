/**
 * Sync in all models to create and update databases
 * Author: https://github.com/omeiza
 * @TODO: Exit process after running script
 */

require('../src/utils/env.util');
const User = require('../src/models/user.model');
const Link = require('../src/models/link.model');
const AuthService = require('../src/models/authService.model');

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