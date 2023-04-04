/**
 * Model: Links
 * Table: links
 * Author: https://github.com/omeiza
 */

const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const User = require("./user.model");

const Link = sequelize.define(
	'links',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				key: 'id',
				model: User
			}
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
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

module.exports = Link;