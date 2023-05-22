require('./utils/env.util.js');
require("./routes/index");
const models = require('./models');
const app = require("./app");
const port = process.env.PORT ?? '3001';

(async () => {
	try {
		models.sequelize
			.authenticate()
			.then(() => {
				console.log('Database connection has been established successfully');

				app.listen(port, () => {
					console.log(`Shortener app listening on port ${port}`);
				});
			});
	} catch (error) {
		console.error('Unable to connect to database -> ', error.original);
	}
})();