/**
 * Get new instance Sequelize ORM object - to be used across the application
 * Author: https://github.com/omeiza
 */

import config from "../configs/db.config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    logging: !!process.env.DEBUG
});

export default sequelize;