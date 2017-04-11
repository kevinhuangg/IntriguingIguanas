const passport = require('passport')
const router = require('express').Router();
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../database/db-queries/User.js')

router.post('/login', passport.authenticate('local', {failureRedirect: 
'/login'}, (req,res) => {
  res.redirect('/lobby')
}))

module.exports = router;

//************ PASSPORT CONFIG *************
var localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
  User.getUserByName(username)
  .then(user => {
    console.log('retrieved user: ', user)
    done(null, user)
  })
  .catch(err => {
    done(null, false, {message: 'Invalid username or password.'})
  })
})

passport.use('local', localStrategy)

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.getUserById(id)
  .then(user => {
    done(null, user)
  })
  .catch(err => {
    done(err)
  })
})

