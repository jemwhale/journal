const express = require('express');
const app = express();
const cors = require('cors');
const { getUserByEmail, createUser, destroyUser, getUserById, updateUser } = require('./server/functions/db')
const { hashPw, comparePw } = require('./server/functions/password');
const { generateToken } = require('./server/functions/jwt');
const { errorHandling, setUser, lowerCaseFields } = require('./server/middleware/index');
const { registerValidationRules, loginValidationRules, updateValidationRules, validate } = require('./server/functions/validation');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(setUser);
app.use(errorHandling);
app.use(lowerCaseFields);

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

//POST
app.post('/user/register', registerValidationRules(), validate, async (req, res, next) => {
  try{
    const {username, email, password} = req.body;
    const foundUser = await getUserByEmail(email);

    if (foundUser){
      res.send(`There is already an account registered to ${email}. If this is your account, please go to /login and  enter your password to login.`)
      return
    }
    const hashedPw = await hashPw(password);
    const user = await createUser(username, email, hashedPw);
    const token = generateToken(user.id, email, username, user.is_admin);
    res.send({message: `${req.body.username} has registered successfully!`, token}); 
  } catch(error){
    next(error)
  }
})

app.post('/user/login', loginValidationRules(), validate, async (req, res, next) => {
  try{
    if(req.user) {
      const {id, email, username, is_admin} = req.user
      const token = generateToken(id, email, username, is_admin); // Should refresh token instead of issuing a new one here
      res.send({message: `Hello ${username}! You are now logged in!`, token});
      return;
    } else {
      const {email, password} = req.body;
      foundUser = await getUserByEmail(email);
      if (!foundUser){
        res.send(`We are unable to find an existing account registered to ${email}. Please go to /register to create a new account.`)
        return;
      }
      const isMatch = await comparePw(password, foundUser.password);   
      if (isMatch) {
        const token = generateToken(foundUser.id, email, foundUser.username, foundUser.is_admin);
        res.send({message: `${foundUser.username} is now logged in!`, token});
        return;
      }
      res.send(`Sorry, the password you have provided is incorrect for the account registered to ${email}. Please enter the correct password to login.`);
    }
  } catch(error) {
    next(error)
  }
})

//DELETE
app.delete('/user/delete', async (req, res, next) => {
  try{
    if(req.user) {
      const user = await getUserById(req.user.id);
      if (user) {
        const {id, email} = req.user;
        await destroyUser(id);
        res.send(`Account registered to ${email} has been successfully deleted.`);
      } else {
        res.send(`We are unable to find an existing account registered to ${req.user.email}. Please go to /register to create a new account.`)
      }
    } else { 
      res.send(`Please log in to delete your account.`)
    }
  } catch(error) {
    next(error)
  }
})

//PUT
app.put('/user/update', updateValidationRules(), validate, async (req, res, next) => {
  try{
    if(req.user) {
      const user = await getUserById(req.user.id);
      if (user) {
        let {password, username} = user;
        let newUserDetails = {password, username}
        if (req.body.password.trim() !== "") {newUserDetails.password = await hashPw(req.body.password)};
        if (req.body.username.trim() !== "") {newUserDetails.username = req.body.username};
        const updatedUser = await updateUser(user, newUserDetails);
        const token = generateToken(updatedUser.id, updatedUser.email, updatedUser.username, updatedUser.is_admin);
        res.send({message: `Account details have been updated for ${updatedUser.email}`, token})
      } else { 
        res.send(`We are unable to find an existing account registered to ${req.user.email}. Please go to /register to create a new account.`)
      }
    } else {
      res.send(`Please log in first to your account.`)
    }
  } catch(error) {
    next(error)
  }
})

//TODO - Router


/* 

Intro
File structure
app vs learning 

issues: 

Real world testing (secrets, browser handling tokens)
Secret types (port and salt count number)
Validity of input data (model fields, email as user [need to verify in real world], case handling as middleware, white space [validator])
Token Expiry (when to re-issue, stateless, no db query, no way to log out) New token instead of refresh
TODO - encrypt emails

*/

/* Exports */

module.exports = app;