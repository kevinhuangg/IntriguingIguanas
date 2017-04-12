

module.exports = function(app, passport) {
  
  app.post('/login', 
    passport.authenticate('local-login'), 
    (req, res) => {
      // console.log('hi')
      res.send({redirect: '/lobby'})
    }
  )
}
