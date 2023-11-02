const models: any = {
    User: require('./users.model'),
    Link: require('./links.model'),
    AuthService: require('./authServices.model')
}

const associate = () => {
    const aliases = <any>{};
    for (const key in models) {
        const m = models[key];
        aliases[m.name] = m;
    }

    for (const key in aliases) {
        const m = aliases[key];
        m.associate?.(aliases);
    }
}

export default {
    ...models,
    associate
}