/**
 * User authentication controller
 * Author: https://github.com/omeiza
 */

const cookie = require("cookie");
const { hash, generateKey } = require("../utils/helper.util");
const Users = require('../models/users.model');
const AuthServices = require("../models/authServices.model");
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
			await AuthServices.create({
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

/**
 * @param req
 * @param res
 */
authController.loginSuccess = (req, res) => {
	if (req.user) {
		res.setHeader('Set-Cookie', cookie.serialize('shortener_key', String(req.user), {
			path: "/",
			httpOnly: false,
			maxAge: 60 * 60 * 24 // 1 day
		}));

		res.statusCode = 302;
		res.setHeader('Location', process.env.CLIENT_URL);
		res.end();
	}
}

/**
 * @param req
 * @param res
 */
authController.loginFailed = (req, res) => {
	res.status(401).json({
		status: "Access Denied!",
	});
}

/**
 *
 * @param token
 * @param tokenSecret
 * @param profile
 * @param done
 * @return {Promise<void>}
 */
authController.twitter = async (token, tokenSecret, profile, done) => {
	AuthServices.getUserByProvider('twitter', profile.id)
		.then(async (result) => {
			const authProvider = result.get({ plain: true });
			const newAPIKey = generateKey();
			await Users.update({apiKey: newAPIKey}, {
				where: {
					id: authProvider.userId
				},
			});

			const user = await Users.findByPk(authProvider.userId);
			done(null, user.apiKey);
		});

	const apikey = generateKey();
	const signupData = {
		email: profile._json.email,
		apiKey: apikey,
		username: `${profile._json.screen_name.toLowerCase()}`,
		isVerified: true
	};

	await Users.build(signupData).save()
		.then(async (newUser) => {
			await AuthServices.create({
				userId: newUser.id,
				providerName: 'twitter',
				providerIdentifier: profile.id
			});

			const userObject = newUser.get({plain: true});
			done(null, userObject.apiKey);
		});

	done(null, false);
}

/**
 *
 * @param token
 * @param tokenSecret
 * @param profile
 * @param done
 * @return {Promise<void>}
 */
authController.google = async (token, tokenSecret, profile, done) => {
	AuthServices.getUserByProvider('google', profile.id)
		.then(async (result) => {
			const authProvider = result.get({ plain: true });

			// Update the user with a new api key
			const newAPIKey = generateKey();
			await Users.update({apiKey: newAPIKey}, {
				where: {
					id: authProvider.userId
				},
			});

			const user = await Users.findByPk(authProvider.userId);
			done(null, user.apiKey);
		});

	const apikey = generateKey();
	const signupData = {
		email: profile._json.email,
		apiKey: apikey,
		username: `${profile._json.given_name.toLowerCase()}${profile._json.family_name.toLowerCase()}`,
		isVerified: true
	};

	Users.build(signupData).save()
		.then(async (newUser) => {
			await AuthServices.create({
				userId: newUser.id,
				providerName: 'google',
				providerIdentifier: profile.id
			});

			const userObject = newUser.get({plain: true});
			done(null, userObject.apiKey);
		});

	done(null, false);
}

module.exports = authController;