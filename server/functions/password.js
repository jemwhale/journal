const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_COUNT = Number(process.env.SALT_COUNT)

const hashPw = async (password) => {
  try {
    const hash = await bcrypt.hash(password, SALT_COUNT);
    return hash;
  } catch(error) {
    throw error
  }
}

const comparePw = async (password, foundPw) => {
  try {
    const isMatch = await bcrypt.compare(password, foundPw);
    return isMatch;
  } catch(error) {
    throw error
  }
}

module.exports = {
    hashPw,
    comparePw
};