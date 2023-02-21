/* Imports */

const {sequelize} = require('./db');
const seed = require('./seedFunction');

/* Functions */

const seedDb = () => {
seed()
.then(() => {
  console.log('Database seeded successfully');
})
.catch(err => {
  console.error(err);
})
.finally(() => {
  sequelize.close();
});
}

/* Initialize */

seedDb();



