require('./src/utils/env.util.js');
const express = require('express');

const app = express();
const port = process.env.PORT ?? '3001';
const models = require('./src/models');

/**
 * Application Main Routes
 * 1. Users
 * 2. Links
 * 3. Authentication
 */
app.use('/users');
app.use('/links');
app.use('/auth');

/**
 * Error handling with express app middleware
 */
app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		status: error.message,
		errors: error.errors
	});
});

(async () => {
	try {
		models.sequelize
			.authenticate()
			.then(() => {
				console.log('Database connection has been established successfully');

				app.listen(port, () => {
					console.log(`Shortner app listening on port ${port}`);
				});
			});
	} catch (error) {
		console.error('Unable to connect to database -> ', error.original);
	}
})();