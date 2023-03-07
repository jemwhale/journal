const jwt =  require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (email, username) => {
    const user = {email, username};
    //TODO include id so its easier to find user
    const token = jwt.sign(user, JWT_SECRET);
    return token;
}

const verifyToken = (token) => {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
}

module.exports = {
    generateToken,
    verifyToken
};