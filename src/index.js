/**
 * Application bootstrap/start-point
 * Date: 24/05/2023
 * Author: https://github.com/omeiza
 */

require('./utils/env.util.js');
require("./routes/index");

const app = require("./app");
const models = require('./models');
const port = process.env.PORT ?? '4001';

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