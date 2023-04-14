require('./src/utils/env.util.js');
const models = require('./src/models');
const userRouter = require('./src/routes/users.route');
const linkRouter = require('./src/routes/links.route');
const authRouter = require('./src/routes/auth.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT ?? '3001';

/**
 * Application Main Routes
 * 1. Users
 * 2. Links
 * 3. Authentication
 */
app.use('/users', userRouter);
app.use('/links', linkRouter);
app.use('/auth', authRouter);

// Cors
app.use(cors());

//Setup body parser
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

// Error handling with express app middleware
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