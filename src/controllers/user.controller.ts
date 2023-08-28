/**
 * User controllers
 * Author: https://github.com/omeiza
 */

import User from "../models/user.model";
import Link from "../models/link.model";
import { Request, Response } from "express";

/**
 * Get existing user
 * @param req
 * @param res
 * @return {Promise<*>}
 */
export const get = async (req: Request, res: Response) => {
	try {
		const username = (req.params.username).toLowerCase();
		if (username !== req.user.username) {
			return res.status(401).send({
				status: 'Access denied'
			});
		}

		const user = await User.scope('public').findByPk(req.user.id);
		const {count, rows} = await Link.findAndCountAll({
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
	} catch (error) {
		console.error('Exception error ->', error);
	}
}