/**
 * Model: User
 * Table: users
 * Author: https://github.com/omeiza
 */

const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize.util');

const User = sequelize.define(
    'users',
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
            set(value) {
                // this.setDataValue('passwordHash', hash(value))
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        apiKey: {
            type: DataTypes.STRING,
            allowNull: true
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

User.associate = (models) => {
    User.hasMany(models.links, {foreignKey: 'userId'});
    models.links.belongsTo(User, {foreignKey: 'userId', as: 'owner'})
}

module.exports = User;