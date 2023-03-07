/* Imports */

const app = require('./index');
const { sequelize } = require('./db');


/* Setting Variables */

const  PORT = process.env.PORT;

/* Functions */

const runServer = () => {app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Journal app now ready at http://localhost:${PORT}`);
})};

/* Initialize */

runServer();