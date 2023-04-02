const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0)
            && (file !== path.basename(module.filename))
            && (file.slice(-3) === 'js')
            && file !== 'all.js'
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].association)
        db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;