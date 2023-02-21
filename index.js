/* Imports */

const express = require('express');
const app = express();
const { User } = require('./db');
require('dotenv').config();
const jwt = require('jsonwebtoken');

/* Setting Variables */

/* Functions */

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// error handling middleware
app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) res.status(500);
    res.send({error: error.message, name: error.name, message: error.message});
  });

  //GET

  app.get('/', async (req, res, next) => {
    try {
      res.send(`
        <h1>Welcome to Journal!</h1>
        <p>Log in via POST /login or register via POST /register</p>
      `);
    } catch (error) {
      console.error(error);
      next(error)
    }
  });

/* Exports */

module.exports = app;
