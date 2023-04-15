/**
 * Sync in all models to create and update databases
 * Author: https://github.com/omeiza
 * @TODO:
 * 1. Exit process after running script
 * 2. Allow drop database to drop all tables in database
 */

require('../src/utils/env.util');
const Users = require('../src/models/users.model');
const Links = require('../src/models/links.model');
const AuthServices = require('../src/models/authServices.model');

(async () => {
	try {
		/**
		 * 1. Sync (Create or Update) in User model
		 * 2. Sync (Create or Update) in AuthService model
		 * 3. Setup model associations between User & AuthService
		 */
		await Users.sync({ alter: true });
		await AuthServices.sync({ alter: true })
			.then(() => {
				Users.hasOne(AuthServices);
				AuthServices.belongsTo(Users);
			});

		/**
		 * 1. Sync (Create or Update) in Link model
		 * 2. Setup model association between Link & User
		 */
		await Links.sync({ alter: true })
			.then(async() => {
				Users.hasMany(Links);
				Links.belongsTo(Users);
			});

		console.log("Database tables successfully synced in!");
	} catch (error) {
		console.log("Error syncing databases tables", error);
	}
})();