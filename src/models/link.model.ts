/**
 * Model: Links
 * Table: links
 * Author: https://github.com/omeiza
 */
require('./../utils/env.util.js');
import User from "./user.model"
import sequelize from "../utils/sequelize.util";
import { DataTypes } from "sequelize";

const Link = sequelize.define(
	'links',
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				key: 'id',
				model: User
			}
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		longUrl: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true
			}
		},
		shortUrl: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true
			}
		},
		customUrl: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isUrl: true
			}
		},
		viewCount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.ENUM('published', 'draft', 'trash'),
			defaultValue: 'draft',
			allowNull: false
		}
	}
);

export default Link;