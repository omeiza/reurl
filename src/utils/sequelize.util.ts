import config from "../configs/db.config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    logging: !!process.env.DEBUG
});

export default sequelize;