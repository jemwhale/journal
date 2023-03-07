const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_COUNT = Number(process.env.SALT_COUNT)

const hashPw = async (password) => {
  const hash = await bcrypt.hash(password, SALT_COUNT);
  return hash;
}

const comparePw = async (password, foundPw) => {
  const isMatch = await bcrypt.compare(password, foundPw);
  return isMatch;
}

module.exports = {
    hashPw,
    comparePw
};