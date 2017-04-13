const db = require('../db.js');

module.exports = {
  getUserByName: (username) => {
    return db.query(`SELECT * FROM users WHERE username='${username}'`)
  },
  getUserByEmail: (email) => {
    return db.query(`SELECT * FROM users WHERE email='${email}'`)
  },
  getUserById: (id) => {
  	return db.query(`SELECT * FROM users WHERE id='${id}'`)
  },
  createUser: (username, email, password) => {
    return db.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`)
  }
}
