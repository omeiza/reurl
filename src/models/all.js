/**
 * Get all model associations
 * Author: https://github.com/omeiza
 */

const models = {
    Users: require('./users.model'),
    Links: require('./links.model'),
    AuthServices: require('./authServices.model')
}
const associate = () => {
    const aliases = {};
    for (const key in models) {
        const m = models[key];
        aliases[m.name] = m;
    }

    for (const key in aliases) {
        const m = aliases[key];
        m.associate?.(aliases);
    }
}

module.exports = {
    ...models,
    associate
}