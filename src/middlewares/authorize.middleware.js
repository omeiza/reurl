import Link from "../models/link.model";

export const links = async (req, res, next) => {
	try {
		const link = await Link.findOne({
			where: {
				id: req.params.id,
				userId: req.user.id
			}
		});

		if (!link) {
			return res.status(404).json({
				status: "Link not found"
			});
		}

		next();
	} catch (error) {
		console.error('Exception error: ', error);
	}
}