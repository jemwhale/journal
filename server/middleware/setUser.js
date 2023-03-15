const { verifyToken } = require('../functions/jwt');

const jwt =  require('jsonwebtoken');
require('dotenv').config();

const setUser = (req,res,next) => {
    try {
      const auth  = req.header('Authorization')
      if (!auth) {
        next();
        return;
      }
      const [, token] = auth.split(" ")
      const user = verifyToken(token);
      req.user = user; 
      next();
    } catch (error) {
      next(error);
    }
  }

  module.exports = { setUser };