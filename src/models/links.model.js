/**
 * Model: Links
 * Table: links
 * Author: https://github.com/omeiza
 */
require('./../utils/env.util.js');
const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const User = require('./users.model');


const Links = sequelize.define(
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
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true
			}
		},
		shortUrl: {
			type: DataTypes.STRING,
			allowNull: true,
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