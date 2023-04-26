/**
 * User controllers
 * Author: https://github.com/omeiza
 */

const Users = require('../models/users.model');
const Links = require('../models/links.model');
const authServices = require("../models/authServices.model");
const userController = {};

/**
 * Add new user
 * @param req
 * @param res
 * @return {Promise<*>}
 */
userController.signup = async (req, res) => {
	try {
		const [user, created] = await Users.findOrCreate({
			where: { email: req.body.email },
			defaults: {
				email: req.body.email,
				username: req.body.username,
				passwordHash: req.body.password
			}
		});

		if (created) {
			await authServices.create({
				userId: user.id,
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

/**
 * Get existing user
 * @param req
 * @param res
 * @return {Promise<*>}
 */
userController.getUser = async (req, res) => {
	try {
		const username = (req.params.username).toLowerCase();
		if (username !== req.user.username) {
			return res.status(401).send({
				status: 'Access denied'
			});
		}

		const user = await Users.scope('public').findByPk(req.user.id);
		const {count, rows} = await Links.findAndCountAll({
			where: {
				userId: req.user.id
			}
		});

		const userLinks = {};
		if (count > 0) {
			userLinks.count = count;
			userLinks.items = rows;
		}

		return res.json({ ...user.toJSON(), links: userLinks});
	} catch (exceptionErr) {
		console.error('Exception error ->', exceptionErr.message);
	}
}

module.exports = userController;