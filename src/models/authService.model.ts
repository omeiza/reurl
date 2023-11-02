import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.util";
import User from "./user.model";

interface AuthServiceAttributes {
	id: number,
	userId: number,
	providerName: string,
	providerIdentifier: string
}

export interface AuthServiceCreationAttributes extends Optional<AuthServiceAttributes, 'id' | 'userId' | 'providerName' | 'providerIdentifier'> {}
export interface AuthServiceInstance extends Model<AuthServiceAttributes, AuthServiceCreationAttributes>, AuthServiceAttributes {
	createdAt?: Date,
	updatedAt?: Date,
	deletedAt?: Date
}

const AuthService: any = sequelize.define<AuthServiceInstance> (
	'authService',
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

AuthService.associate = (models:any) => {
	models.user.hasOne(AuthService, { foreignKey: 'userId' });
	AuthService.belongsTo(models.user);
}

AuthService.getUserByProvider = function(providerType: string, id: number) {
	return AuthService.findOne({
		where: {
			providerName: providerType,
			providerIdentifier: id
		}
	});
}

export default AuthService;