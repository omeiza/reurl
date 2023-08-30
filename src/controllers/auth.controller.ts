/**
 * User authentication controller
 * Author: https://github.com/omeiza
 */

const cookie = require("cookie");
import { Request, Response } from "express";
import { hash, generateKey } from "../utils/helper.util";
import User, {UserCreationAttributes, UserInstance} from "../models/user.model";
import AuthService from "../models/authService.model";

/**
 * Add new user
 * @param req
 * @param res
 * @return {Promise<*>}
 */
export const signup = async (req: Request, res: Response) => {
	try {
		const [user, created] = await User.findOrCreate({
			where: { email: req.body.email },
			defaults: {
				email: req.body.email,
				username: req.body.username,
				passwordHash: req.body.password
			}
		});

		if (created) {
			await AuthService.create({
				userId: user.id,
				providerIdentifier: user.email
			});

			return res.json({
				apiKey: user.apiKey
			});
		}

		return res.status(400).json({
			status: "User already exist",
		});
	} catch (error) {
		console.error('Exception error ->', error);
	}
}

/**
 * Login
 * @param req
 * @param res
 * @return {JSON}
 */
export const login = async (req: Request, res: Response) => {
	try {
		const args = <UserCreationAttributes>{};
		if (req.body.username) args.username = req.body.username;
		if (req.body.email) args.email = req.body.email;

		User.findOne({ where: args })
			.then(async (user: UserInstance) => {
				if (!user) {
					return res.status(401).send({
						status: 'Access denied'
					});
				}

				const userObject = user.get({ plain: true });
				if (hash(req.body.password) !== userObject.passwordHash) {
					return res.status(401).send({
						status: 'Access denied'
					});
				}

				const newKey = generateKey();
				await User.update({
					apiKey: newKey
				}, {
					where: {
						id: userObject.id
					}
				});

				return res.json({
					apiKey: newKey
				});
			});
	} catch (error) {
		console.error('Exception error ->', error);
	}
}

/**
 * @param req
 * @param res
 */
export const loginSuccess = (req: Request, res: Response): Response | boolean => {
	if (req.user && process.env.SITE_URL) {
		res.setHeader('Set-Cookie', cookie.serialize('shortener_key', String(req.user), {
			path: "/",
			httpOnly: false,
			maxAge: 60 * 60 * 24 // 1 day
		}));

		res.statusCode = 302;
		res.setHeader('Location', process.env.SITE_URL);
		res.end();
	}

	return false;
}

/**
 * @param req
 * @param res
 */
export const loginFailure = (req: Request, res: Response): void => {
	res.status(401).json({
		status: "Access Denied!",
	});
}