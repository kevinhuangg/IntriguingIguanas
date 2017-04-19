const User = require('../../database/db-queries/User.js');

module.exports = function(app, passport) {
  app.post('/login',
    passport.authenticate('local-login'),
    (req, res) => {
      //DB query goes here for userID
      var username = req.body.username
      var userid;
      User.getUserIDbyName(username)
      .then(results => {
        userid = results.rows[0].id
        res.send({
          redirect: '/lobby',
          user_id: userid
        })
      })
      .catch(error => {
        console.log(error)
      }) //username
    }
  )
}
