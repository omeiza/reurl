/**
 * Database config
 * Author: https://github.com/omeiza
 */

const env = process.env;
module.exports = {
    host: env.DB_HOST ?? '127.0.0.1',
    user: env.DB_USER ?? 'root',
    password: env.DB_PASSWORD ?? '',
    database: env.DB_NAME ?? 'shortener',
    port: env.DB_PORT ?? 3306
}