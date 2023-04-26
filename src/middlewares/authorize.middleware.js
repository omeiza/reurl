/**
 * Authorization middleware
 * Author: https://github.com/omeiza
 */

const Links = require('../models/links.model');
const authorize = {};

/**
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
authorize.links = async (req, res, next) => {
	try {
		const link = await Links.findOne({
			where: {
				id: req.params.id,
				userId: req.user.id
			}
		});

		if (!link) {
			return res.status(404).json({
				status: "Link not found"
			});
		}

		next();
	} catch (exceptionErr) {
		console.error('Exception error ->', exceptionErr.message);
	}
}