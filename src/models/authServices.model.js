/**
 * Model: AuthServices
 * Table: authServices
 * Author: https://github.com/omeiza
 */

const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const User = require('./users.model');

const AuthServices = sequelize.define(
	'authServices',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				key: 'id',
				model: User
			}
		},
		providerName: {
			type: DataTypes.ENUM('onsite', 'twitter', 'google'),
			defaultValue: 'onsite',
			allowNull: false
		},
		providerIdentifier: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}
);

AuthServices.associate = (models) => {
	models.users.hasOne(AuthServices, {foreignKey: 'userId'});
	AuthServices.belongsTo(models.users);
}

module.exports = AuthServices;