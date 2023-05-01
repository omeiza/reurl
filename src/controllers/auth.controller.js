/**
 * User authentication
 * Author: https://github.com/omeiza
 */

const Users = require('../models/users.model');
const authServices = require("../models/authServices.model");
const { hash, generateKey } = require("../utils/helper.util");
const authController = {};

/**
 * Add new user
 * @param req
 * @param res
 * @return {Promise<*>}
 */
authController.signup = async (req, res) => {
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
 * Login
 * @param req
 * @param res
 * @return {JSON}
 */
authController.login = async (req, res) => {
	try {
		const args = {};
		if (req.body.username) args.username = req.body.username;
		if (req.body.email) args.email = req.body.email;

		Users.findOne({
			where: args
		})
			.then(async user => {
				if (!user) {
					return res.status(401).send({
						status: 'Access denied'
					});
				}

				const userObject = user.get({ plain: true });
				if (hash(req.body.password) !== userObject.passwordHash) {
					return res.status(401).send({
						status: 'Access denied'
					});
				}

				const newKey = generateKey();
				await Users.update({
					apiKey: newKey
				}, {
					where: {
						id: userObject.id
					}
				});

				return res.json({
					apiKey: newKey
				});
			});
	} catch (exceptionErr) {
		console.error('Exception error ->', exceptionErr.message);
	}
}

module.exports = authController;
