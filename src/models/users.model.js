/**
 * Model: User
 * Table: users
 * Author: https://github.com/omeiza
 */

const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const { hash, generateKey } = require('../utils/helper.util');

const Users = sequelize.define(
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

Users.addScope('public', {
    attributes: [ 'id', 'email', 'username', 'isAdmin', 'isActive']
});

Users.addScope('protected', {
    attributes: {
        exclude: [ 'passwordHash', 'apiKey' ]
    }
});

Users.associate = (models) => {
    Users.hasMany(models.links, {foreignKey: 'userId'});
    models.links.belongsTo(Users, {foreignKey: 'userId', as: 'owner'})
}

module.exports = Users;