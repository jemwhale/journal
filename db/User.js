/* Imports */

const {Sequelize, sequelize} = require('./db');

/* Functions */

const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, allowNull: false},
  email: { type: Sequelize.STRING, allowNull: false, unique: true},
  password: { type: Sequelize.STRING, allowNull: false},
  is_admin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});

/* Exports */

module.exports = { User };

