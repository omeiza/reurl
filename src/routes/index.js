/**
 * Get new instance Sequelize ORM object - to be used across the application
 * Author: https://github.com/omeiza
 */

const app = require("../app");
const userRouter = require("./users.route");
const linkRouter = require("./links.route");
const authRouter = require("./auth.route");

app.use('/users', userRouter);
app.use('/links', linkRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
	res.json({
		message: 'URL Shortener API... 😉'
	})
});