/**
 * Link controllers
 * Author: https://github.com/omeiza
 */

const { uniqueID } = require('../utils/helper.util');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Links = require('../models/links.model');
const linkControllers = {};

/**
 * getMany lists out links that matches a particular search criteria
 * The criteria are -> search query, count (perPage), page, status, order, orderBy
 * Returns an array of link objects
 * @param req
 * @param res
 * @return {JSON}
 */
linkControllers.getMany = (req, res) => {
	try {
		const perPage = req.query.count ? parseInt(req.query.count) : 8;
		const page = req.query.page ? parseInt(req.query.page) : 1;

		const where = { userId: req.user.id };
		const args = {
			limit: perPage,
			offset: perPage * (page - 1)
		}

		if (req.query.status) {
			where.status = req.query.status;
		}

		if (req.query.search) {
			const search = req.query.search.toLowerCase();

			where.url = {
				[Op.like]: `%${search}%`
			}
		}

		args.where = where;
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
linkControllers.get = (req, res) => {
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
					status: 'Error fetching link',
					error: error.message
				});
			})
	} catch (exceptionErr) {
		console.error('Exception error -> ', exceptionErr.message);
	}
}

/**
 * Creates a short link
 * Returns the newly created short link id
 * @param req
 * @param res
 * @return {JSON}
 */
linkControllers.add = (req, res) => {
	try {
		Links.build({
			id: uniqueID(6),
			userId: req.user.id,
			url: req.body.url
		})
			.save()
			.then((link) => {
				const linkObj = link.get({ plain: true });
				return res.json({
					id: linkObj.id
				})
			})
			.catch(error => {
				return res.status(500).json({
					status: 'Error adding link',
					error: error.message
				})
			})
	} catch (exceptionErr) {
		console.error('Exception error -> ', exceptionErr.message);
	}
}

/**
 * Update specific link
 * @param req
 * @param res
 * @return {void}
 */
linkControllers.update = (req, res) => {
	try {
		const args = {};
		if (req.body.status) args.status = req.body.status;
		if (req.body.url) args.url = req.body.url;

		Links.update(args, {
			where: {
				id: req.params.id
			}
		})
			.then(() => {
				return res.json({
					status: 'Ok'
				});
			})
			.catch(error => {
				return res.status(500).json({
					status: 'Error updating link',
					error: error.message
				})
			});
	} catch (exceptionErr) {
		console.error('Exception error -> ', exceptionErr.message);
	}
}

/**
 * Delete specific link
 * @param req
 * @param res
 * @return {void}
 */
linkControllers.delete = (req, res) => {
	try {
		Links.destroy({
			where: {
				id: req.params.id
			}
		})
			.then((a) => {
				return res.json({
					status: "Ok"
				})
			})
			.catch(error => {
				return res.status(500).json({
					status: 'Error deleting link',
					error: error.message
				})
			});
	} catch (exceptionErr) {
		console.error('Exception error -> ', exceptionErr.message);
	}
}

module.exports = linkControllers;