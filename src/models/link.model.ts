import "../utils/env.util";
import User from "./user.model"
import sequelize from "../utils/sequelize.util";
import { Model, Optional, DataTypes } from "sequelize";

interface LinkAttributes {
	id: string,
	userId: number,
	title: string,
	longUrl: string,
	shortUrl: string,
	customUrl: string,
	viewCount: number,
	status: string
}

export interface LinkCreationAttributes extends Optional<LinkAttributes, 'id' | 'title' | 'longUrl' | 'shortUrl' | 'viewCount' | 'status'> {}
export interface LinkInstance extends Model<LinkAttributes, LinkCreationAttributes>, LinkAttributes {
	createdAt?: Date,
	updatedAt?: Date,
	deletedAt?: Date
}

const Link = sequelize.define<LinkInstance>(
	'link',
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