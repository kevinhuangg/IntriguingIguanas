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
      // console.log('user', user.rows[0])
      if (!user.rows[0]) {
        console.log('no user found')
        done(null,false)
      }
      //TODO: chcek to see if password is a match
      bcrypt.compare(password, user.rows[0].password)
      .then(res => {
        // console.log("SAME SAME but different")
        if (res) {
          done(null, user.rows[0])    
        } else {
          console.log("Wrong password")
        }
      })
    })
    .catch(error => {
      console.log(err)
    })
  }))
}
