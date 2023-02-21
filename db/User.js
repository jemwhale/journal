/* Imports */

const {Sequelize, sequelize} = require('./db');

/* Functions */

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

/* Exports */

module.exports = { User };

