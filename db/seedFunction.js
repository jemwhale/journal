/* Imports */

const {sequelize} = require('./db');
const {User} = require('./');
const {users} = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(users);
};

/* Exports */

module.exports = seed;