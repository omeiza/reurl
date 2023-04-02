/**
 * Model: User
 * Table: Users
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

        }
    }
)