const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/db-queries/User.js');
const bcrypt = require('bcrypt');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.getUserById(id).then(user => {
      // console.log('userid', user.rows[0].id)
      done(null, user.rows[0].id)
    })
    .catch(err => {
      console.log(err)
    })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.getUserByName(username).then(user => {
      if (!user.rows[0]) {
        console.log('no user found')
        done(null, false)
      }
      bcrypt.compare(password, user.rows[0].password)
      .then(res => {
        if (res) {
          done(null, user.rows[0])
        } else {
          done(null, false)
        }
      })
    })
    .catch(error => {
      return done(error)
    })
  }))
}
