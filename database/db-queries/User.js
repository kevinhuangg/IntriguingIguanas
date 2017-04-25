const db = require('../db.js');

module.exports = {
  getUserByName: (username) => { //USE FOR PASSPORT
    return db.query(`SELECT * FROM users WHERE username='${username}'`)
  },
  getUserIDbyName: (username) => {
    return db.query(`SELECT id FROM users WHERE username='${username}'`)
  },
  getUserByEmail: (email) => {
    return db.query(`SELECT * FROM users WHERE email='${email}'`)
  },
  getUserById: (id) => {
  	return db.query(`SELECT * FROM users WHERE id=${id}`)
  },
  createUser: (username, email, password) => {
    return db.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`)
  },
  addUserToBoard: (username, board_id) => {
    return db.query(`SELECT * FROM users WHERE username='${username}'`)
    .then(result => {
      var user_id = result.rows[0].id
      console.log('USERIDDDDDD', user_id)
      return db.query(`INSERT INTO users_boards (user_id, board_id) VALUES (${user_id},${board_id})`)
    })
    .catch(error => {
      console.log(error)
    })
  },
  getUsernames: () => {
    return db.query('SELECT username FROM USERS')
  }
}
