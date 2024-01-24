import User, { UserInstance } from "../models/user.model";
import Link, { LinkInstance } from "../models/link.model";
import { Request, Response } from "express";

// Request error definition
interface UserRequest extends Request {
	user?: UserInstance
}

export const get = async (req: UserRequest, res: Response) => {
	try {
		if (req.user) {
			const username = (req.params.username).toLowerCase();
			if (username !== req.user.username) {
				return res.status(401).send({
					status: 'Access denied'
				});
			}

			const user: UserInstance = await User.scope('public').findByPk(req.user.id);
			const {count, rows} = await Link.findAndCountAll({
				where: {
					userId: req.user.id
				}
			});

			const userLinks = {} as {count: number, items: LinkInstance[]};
			if (count > 0) {
				userLinks.count = count;
				userLinks.items = rows;
			}

			return res.json({ ...user.toJSON(), links: userLinks});
		}
	} catch (error) {
		console.error('Exception error ->', error);
	}
}