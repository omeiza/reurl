/**
 * User controllers
 * Author: https://github.com/omeiza
 */

const Users = require('../models/users.model');
const Links = require('../models/links.model');
const authServices = require("../models/authServices.model");
const { hash, generateKey } = require("../utils/helper.util");
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
 * Login
 * @param req
 * @param res
 * @return {JSON}
 */
userController.login = async (req, res) => {
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