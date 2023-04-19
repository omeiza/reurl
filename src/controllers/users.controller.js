/**
 * User controllers
 * Author: https://github.com/omeiza
 */

const Users = require('../models/users.model');
const authServices = require("../models/authServices.model");
const userControllers = {};

/**
 * @param req
 * @param res
 * @return {Promise<*>}
 */
userControllers.signup = async (req, res) => {
	console.log(req.body);
	try {
		const [user, created] = Users.findOrCreate({
			where: { email: req.body.email },
			defaults: {
				email: req.body.email,
				username: req.body.username,
				passwordHash: req.body.password
			}
		});

		if (created) {
			await authServices.create({
				userId: user.userId,
				providerIdentifier: user.email
			});

			return res.json({
				apiKey: user.apiKey
			});
		}

		return res.status(400).json({
			status: "User already exist",
		});
	} catch (exceptionErr) {
		console.error('Exception error ->', exceptionErr.message);
	}
}

module.exports = userControllers;