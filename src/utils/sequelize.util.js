const config = require('../configs/db.config');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    logging: !!process.env.DEBUG
});

module.exports = sequelize;