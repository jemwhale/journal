const jwt =  require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const generateToken = (id, email, username, is_admin) => {
    try {
        const user = {id, email, username, is_admin};
        const token = jwt.sign(user, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
        return token;
    } catch (error) {
        throw error;
    }
}

const verifyToken = (token) => {
    try {
        const user = jwt.verify(token, JWT_SECRET);
        return user;
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};