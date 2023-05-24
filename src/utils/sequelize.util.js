/**
 * Get new instance Sequelize ORM object - to be used across the application
 * Author: https://github.com/omeiza
 */

const config = require('../configs/db.config');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    logging: !!process.env.DEBUG
});

module.exports = sequelize;