const models = {
    User: require('./user.model')
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