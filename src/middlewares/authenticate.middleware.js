/**
 * Authentication middleware
 * Author: https://github.com/omeiza
 */

const Users = require('../models/users.model');

/**
 * Authenticate user
 * @param req
 * @param res
 * @param next
 * @return {void}
 */
const authenticate = (req, res, next) => {
	try {
		Users.findOne({
			where: {
				apiKey: req?.headers['x-api-key']
			}
		})
			.then(user => {
				if (!user) {
					return res.status(401).send({
						status: 'Access denied'
					});
				}

				req.user = user.get({ plain: true });
				next();
			});
	} catch (exceptionErr) {
		console.error('Exception error ->', exceptionErr.message);
	}
}

module.exports = authenticate;