const app = require("../app");
const userRouter = require("./users.route");
const linkRouter = require("./links.route");
const authRouter = require("./auth.route");

/**
 * Application Main Routes
 * 1. Users
 * 2. Links
 * 3. Authentication
 */

app.use('/users', userRouter);
app.use('/links', linkRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
	res.json({
		message: 'Ok!'
	})
});