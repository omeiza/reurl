const env = process.env;
export default {
    host: env.DB_HOST ?? '127.0.0.1',
    user: env.DB_USER ?? 'root',
    password: env.DB_PASSWORD ?? '',
    database: env.DB_NAME ?? 'reurl',
    port: env.DB_PORT ?? 3306
}