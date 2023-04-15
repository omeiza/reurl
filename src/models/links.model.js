/**
 * Model: Links
 * Table: links
 * Author: https://github.com/omeiza
 */

const {DataTypes} = require('sequelize');
const { customAlphabet } = require('nanoid/async');
const sequelize = require('../utils/sequelize.util');
const User = require('./users.model');

const Links = sequelize.define(
	'links',
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: async () => {
				const nanoid = customAlphabet('1234567890abcdefgh', 10);
				return await nanoid();
			},
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

module.exports = Links;