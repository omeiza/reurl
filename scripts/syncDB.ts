require('../src/utils/env.util');
import User from "../src/models/user.model";
import Link from "../src/models/link.model";
import AuthService from "../src/models/authService.model";

(async () => {
	try {
		await User.sync({ alter: true });
		await AuthService.sync({ alter: true })
			.then(() => {
				User.hasOne(AuthService);
				AuthService.belongsTo(User);
			});

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