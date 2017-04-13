const router = require('express').Router();
const User = require('./routes/user');

//board routes

//list routes

//task routes

//user routes
//Create new user
router.post('/signup', User.postUser);

module.exports = router; 
  