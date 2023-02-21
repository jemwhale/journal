/* Imports */

const path = require('path');
const { Sequelize } = require('sequelize');

/* Functions */

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false
});

/* Exports */

module.exports = {
    sequelize,
    Sequelize
};