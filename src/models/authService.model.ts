/**
 * Model: AuthServices
 * Table: authServices
 * Author: https://github.com/omeiza
 */

import sequelize from "../utils/sequelize.util";
import { DataTypes } from "sequelize";
import User from "./user.model";

const AuthService = sequelize.define(
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
			allowNull: false,
			references: {
				key: 'id',
				model: User
			}
		},
		providerName: {
			type: DataTypes.ENUM('onsite', 'google'),
			defaultValue: 'onsite',
			allowNull: false
		},
		providerIdentifier: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}
);

AuthService.associate = (models) => {
	models.users.hasOne(AuthService, {foreignKey: 'userId'});
	AuthService.belongsTo(models.users);
}

AuthService.getUserByProvider = function(providerType, id: number) {
	return AuthService.findOne({
		where: {
			providerName: providerType,
			providerIdentifier: id
		}
	})
}

export default AuthService;