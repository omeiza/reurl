/**
 * Link controllers
 * Author: https://github.com/omeiza
 */

import { uniqueID } from "../utils/helper.util";
import Sequelize from "sequelize";
import { Request, Response, RequestHandler } from "express";
import Link from "../models/link.model";
import {UserTypes} from "../types/user";

const Op = Sequelize.Op;

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
	query: string;
}

/**
 * getMany lists out links that matches a particular search criteria
 * The criteria are -> search query, count (perPage), page, status, order, orderBy
 * Returns an array of link objects
 * @param req
 * @param res
 * @return {JSON}
 */
export const getMany: RequestHandler<Params, ResBody, ReqBody, ReqQuery> = (req: Request, res: Response) => {
	type whereT = {
		userId: number,
		status: string | ParsedQs | string[] | ParsedQs[],
	}

	try {
		const perPage = req.query.count ? parseInt(<string>req.query.count) : 8;
		const page = req.query.page ? parseInt(<string>req.query.page) : 1;
		const where = <whereT>{};
		const args: { limit: number, offset: number} = { limit: perPage, offset: perPage * (page - 1) }


		// { userId: req.user?.id };

		if (req && req.user) {
			const user: UserTypes = req.user;
			where.userId = req.user.id;
		}

		if (req.query.status) {
			where.status = req.query.status;
		}

		if (req.query.search) {
			const search = req.query.search.toLowerCase();
			where.title = {
				[Op.like]: `%${search}%`
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
export const add = (req: Request, res: Response) => {
	try {
		const id = uniqueID(6);
		Link.build({
			id: id,
			userId: req.user.id,
			title: req.body.title ? req.body.title : null,
			longUrl: req.body.url,
			shortUrl: req.body.customUrl ? req.body.customUrl : `${process.env.SITE_URL}/${id}`,
			customUrl: req.body.customUrl ? req.body.customUrl : null,
		})
			.save()
			.then((link) => {
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