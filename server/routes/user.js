//endpoint for user routes
//import user related db queries
const db = require('../../database/db-queries/User.js');
const bcrypt = require('bcrypt');

module.exports.postUser = function(req, res) { //user account creation
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => {
    db.createUser(req.body.username, req.body.email, hash)
    .then(results => {
      res.status(201).send('User created')
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send('Could not create user - duplicate username or email')
    })
  })
  .catch(error => {
    console.log('reaches', error)
    res.status(404).send('Error posting user')
  })
}

module.exports.getUsernames = function (req, res) {
  db.getUsernames()
  .then(results => {
    var usernames = [];
    results.rows.map((user) => {
      usernames.push(user.username);
    })
    res.status(200).send(usernames)
  })
  .catch(error => {
    res.status(404).send('Could not fetch usernames')
  })
}
