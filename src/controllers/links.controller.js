/**
 * Link controllers
 * Author: https://github.com/omeiza
 */

const Links = require('../models/links.model');
const linkControllers = {};

/**
 * getMultipleLinks lists out links that matches a particular search criteria
 * The criteria are -> search query, count (perPage), page, status, order, orderBy
 * Returns a JSON of count, page, perPage, and links
 * @param req
 * @param res
 * @return {JSON}
 * @TODO Sort out search using search query
 * @TODO Add orderByy and order to filter link search result
 */
linkControllers.getMultipleLinks = (req, res) => {
	const perPage = req.query.count ? parseInt(req.query.count) : 8;
	const page = req.query.page ? parseInt(req.query.page) : 1;

	const where = {};
	const args = {
		limit: perPage,
		offset: perPage * (page - 1)
	}

	if (req.query.status) {
		where.status = req.query.status;
	}

	Links.unscoped().findAndCountAll(args)
		.then(async linksCountAndRows => {
			const {count, rows} = linksCountAndRows;

			return res.json({
				count: count,
				page: page,
				perPage: perPage,
				links: rows
			})
		})
		.catch(error => {
			res.status(500).json({
				status: 'Error fetching links',
				error: error.message
			})
		});
}

module.exports = linkControllers;