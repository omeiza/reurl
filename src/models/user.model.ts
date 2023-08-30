/**
 * Model: User
 * Table: users
 * Author: https://github.com/omeiza
 */

import sequelize from "../utils/sequelize.util";
import { Model, Optional, DataTypes } from "sequelize";
import { hash, generateKey } from "../utils/helper.util";

interface UserAttributes {
    id: number,
    email: string,
    passwordHash?: string,
    username: string,
    apiKey: string,
    isAdmin: boolean,
    isActive: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'email' | 'username' | 'apiKey'> {}
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

const User: any = sequelize.define<UserInstance>(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: true,
            set(value: string) {
                this.setDataValue('passwordHash', hash(value))
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        apiKey: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: generateKey()
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
);

User.addScope('public', {
    attributes: [ 'id', 'email', 'username', 'isAdmin', 'isActive']
});

User.addScope('protected', {
    attributes: {
        exclude: [ 'passwordHash', 'apiKey' ]
    }
});

User.associate = (models: any): void => {
    User.hasMany(models.link, { foreignKey: 'userId' });
    models.link.belongsTo(User, { foreignKey: 'userId', as: 'owner' })
}

export default User;