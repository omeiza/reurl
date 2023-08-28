/**
 * Authentication middleware
 * Author: https://github.com/omeiza
 */

import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import {UserTypes} from "../types/user";

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
			.then((user) => {
				if (!user) {
					return res.status(401).send({
						status: 'Access denied'
					});
				}

				req.user = <UserTypes>user.get({ plain: true });
				next();
			});
	} catch (error) {
		console.error('Exception error: ', error);
	}
}

export default authenticate;