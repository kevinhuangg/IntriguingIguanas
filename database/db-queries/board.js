const db = require('../db.js');

module.exports = {
  //add list to db
  addBoard: (name, userId) =>{
    return db.query(`INSERT INTO boards (boardname) VALUES ('${name}') RETURNING id`)
      .then(board => {
        var board = board.rows[0].id
        return db.query(`INSERT INTO users_boards (user_id, board_id) VALUES (${userId},${board})`)
      })
      .catch(error => {
        console.log(error)
      })
  },
  //edit list name in db
  editBoardName: (name, boardId) => {
    return db.query(`UPDATE boards SET boardname='${name}' WHERE board_id=${boardId}`)
  },
  //delete board from db using board id
  deleteBoard: (boardId) => {
    return db.query(`DELETE FROM boards WHERE id=${boardId} RETURNING id`)
    .then(board => {
      var board = board.rows[0].id
      console.log(board, "MEOW");
      return db.query(`DELETE FROM users_boards WHERE id=${board}`)
    })
    .catch(error => {
      console.log(error)
    })
  },
  //fetch board based on user_id
  fetchBoardNames:  (userId) => {
    return db.query(`SELECT boards.boardname, boards.id FROM boards INNER JOIN users_boards ON boards.id=users_boards.board_id WHERE users_boards.user_id=${userId}`)
  },
  //fetch board with an id
  fetchBoard: (boardId) => {
    return db.query(`SELECT * FROM boards LEFT JOIN lists ON boards.id=lists.board_id LEFT JOIN tasks on lists.id = tasks.list_id WHERE boards.id=${boardId}`)
  }

}
