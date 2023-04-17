/**
 * Link controllers
 * Author: https://github.com/omeiza
 */

const Links = require('../models/links.model');
const linkControllers = {};

/**
 * getMultipleLinks lists out links that matches a particular search criteria
 * The criteria are -> search query, count (perPage), page, status, order, orderBy
 * Returns an array of link objects
 * @param req
 * @param res
 * @return {JSON}
 * @TODO Sort out search using search query
 * @TODO Add orderBy and order to filter link search result
 */
linkControllers.getMultipleLinks = (req, res) => {
	try {
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

		Links.findAndCountAll(args)
			.then(async linksCountAndRows => {
				const {count, rows} = linksCountAndRows;

				if (count < 1) {
					return res.status(404).json({
						status: "No record found"
					});
				}

				return res.json({
					count: count,
					page: page,
					perPage: perPage,
					links: rows
				});
			})
			.catch(error => {
				res.status(500).json({
					status: 'Error fetching links',
					error: error.message
				});
			});
	} catch (exceptionErr) {
		console.error('Exception error -> ', exceptionErr.message);
	}
}

/**
 * getLink gets a single link
 * Returns a link
 * @param req
 * @param res
 * @return {JSON}
 */
linkControllers.getLink = (req, res) => {
	try {
		Links.findByPk(req.params.id)
			.then(link => {
				if (!link || link.length === 0) {
					return res.status(404).json({
						status: 'No record found'
					});
				}

				return res.json(link);
			})
			.catch(error => {
				res.status(500).json({
					status: 'Error fetching links',
					error: error.message
				});
			})
	} catch (exceptionErr) {
		console.error('Exception error -> ', exceptionErr.message);
	}
}

module.exports = linkControllers;