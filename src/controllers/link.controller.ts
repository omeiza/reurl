import { uniqueID } from "../utils/helper.util";
import Sequelize from "sequelize";
import { Request, Response } from "express";
import { UserInstance } from "../models/user.model";
import Link, {LinkInstance} from "../models/link.model";

const Op = Sequelize.Op;

// Request error definition
interface UserRequest extends Request {
	user?: UserInstance
}

/**
 * getMany lists out links that matches a particular search criteria
 * The criteria are -> search query, count (perPage), page, status, order, orderBy
 * Returns an array of link objects
 * @param req
 * @param res
 * @return {JSON}
 */
export const getMany = (req: UserRequest, res: Response) => {
	try {
		const perPage = req.query.count ? parseInt(<string>req.query.count) : 8;
		const page = req.query.page ? parseInt(<string>req.query.page) : 1;
		const args: any = { limit: perPage, offset: perPage * (page - 1) }
		const where: any = {};

		if (req && req.user) {
			where.userId = req.user.id;
		}

		if (req.query.status) {
			where.status = req.query.status;
		}

		if (req.query.search) {
			const search = req.query.search;
			if (typeof search === "string") {
				where.title = {
					[Op.like]: `%${search.toLowerCase()}%`
				}
			}
		}

		args.where = where;
		Link.findAndCountAll(args)
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
	} catch (error) {
		console.error('Exception error -> ', error);
	}
}

/**
 * getLink gets a single link
 * Returns a link
 * @param req
 * @param res
 * @return {JSON}
 */
export const get = (req: Request, res: Response) => {
	try {
		Link.findByPk(req.params.id)
			.then((link) => {
				if (link) return res.json(link);
				return res.status(404).json({
					status: 'No record found'
				});
			})
			.catch(error => {
				res.status(500).json({
					status: 'Error fetching link',
					error: error.message
				});
			})
	} catch (error) {
		console.error('Exception error -> ', error);
	}
}

/**
 * Creates a short link
 * Returns the newly created short link id
 * @param req
 * @param res
 * @return {JSON}
 */
export const add = (req: UserRequest, res: Response) => {
	try {
		const id = uniqueID(6);
		if (req.user && id.length > 0) {
			Link.build({
				id: id,
				userId: req.user.id,
				title: req.body.title ? req.body.title : null,
				longUrl: req.body.url,
				shortUrl: req.body.customUrl ? req.body.customUrl : `${process.env.SITE_URL}/${id}`,
				customUrl: req.body.customUrl ? req.body.customUrl : null,
			})
				.save()
				.then((link: LinkInstance) => {
					const linkObj = link.get({ plain: true });
					return res.json({
						id: linkObj.id,
						shortUrl: linkObj.shortUrl,
						longUrl: linkObj.longUrl
					})
				})
				.catch(error => {
					return res.status(500).json({
						status: 'Error adding link',
						error: error.message
					})
				})
		}
	} catch (error) {
		console.error('Exception error -> ', error);
	}
}

/**
 * Update specific link
 * @param req
 * @param res
 * @return {void}
 */
export const update = (req: Request, res:Response) => {
	try {
		const args = {} as { status: string, title: string, longUrl: string };
		if (req.body.status) args.status = req.body.status;
		if (req.body.title) args.title = req.body.title;
		if (req.body.longUrl) args.longUrl = req.body.longUrl;

		Link.update(args, {
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
	} catch (error) {
		console.error('Exception error -> ', error);
	}
}

/**
 * Delete specific link
 * @param req
 * @param res
 * @return {void}
 */
export const deleteLink = (req: Request, res: Response) => {
	try {
		Link.destroy({
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
	} catch (error) {
		console.error('Exception error -> ', error);
	}
}