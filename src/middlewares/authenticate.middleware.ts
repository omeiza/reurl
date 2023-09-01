/**
 * Authentication middleware
 * Author: https://github.com/omeiza
 */

import { Request, Response, NextFunction } from "express";
import User, { UserInstance } from "../models/user.model";

/**
 * Authenticate user
 * @param req
 * @param res
 * @param next
 * @return {void}
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
	try {
		User.findOne({ where: { apiKey: req?.headers['x-api-key'] } })
			.then((user: UserInstance) => {
				if (!user) {
					return res.status(401).send({
						status: 'Access denied'
					});
				}

				req.user = user.get({ plain: true });
				next();
			});
	} catch (error) {
		console.error('Exception error: ', error);
	}
}

export default authenticate;