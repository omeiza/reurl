/**
 * Consolidates all models and attach them to their associations
 * Author: https://github.com/omeiza
 */

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const db = {} as {
    sequelize:
};

fs
    .readdirSync(__dirname)
    .filter((file: string) => {
        return (file.indexOf('.') !== 0)
            && (file !== path.basename(module.filename))
            && (file.slice(-2) === 'js')
            && file !== 'all.js'
    })
    .forEach((file: string) => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].association)
        db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;