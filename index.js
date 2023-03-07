const express = require('express');
const app = express();
const cors = require('cors')
const { User } = require('./db');
const { hashPw, comparePw } = require('./server/functions/password');
const { generateToken } = require('./server/functions/jwt');
const { errorHandling, setUser } = require('./server/middleware/index');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(setUser);
app.use(errorHandling)

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

app.get('/user', async (req, res, next) => {
  try{
    const user = req.user 
    if (!user) {
      res.send('There is nobody logged in')
      return;
    }
    res.send(user); 
  }catch(error){
    next(error);
  }
})

//POST
app.post('/register', async (req, res, next) => {
  try{
    const {username, email, password} = req.body;
    const foundUser = await User.findOne({where: {email}});

    if (foundUser){
      res.send(`There is already an account registered to ${email}. If this is your account, please go to /login and  enter your password to login.`)
      return
    }
    const hashedPw = await hashPw(password);
    const user = await User.create({username, email, password: hashedPw})
    res.send(`${req.body.username} has registered successfully!`) 
    //TODO create and send token
  } catch(error){
    next(error)
  }
})

app.post('/login', async (req, res, next) => {
  try{
    const {email, password} = req.body;
    const foundUser = await User.findOne({where: {email}});
    if (!foundUser){
      res.send(`We are unable to find an account registered to ${email}. Please go to /register to create a new account.`)
      return
    }
    const isMatch = await comparePw(password, foundUser.password);   

    if (isMatch) {
      const token = generateToken(email, foundUser.username);
      res.send({message: "User successfully created", token});
      return;
    }
    res.send(`Sorry, the password you have provided is incorrect for ${email}. Please enter the correct password to login.`);
  } catch(error) {
    next(error)
  }
})

/* Exports */

module.exports = app;