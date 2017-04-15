const db = require('../db.js');

module.exports = {}
  //fetch board list
  fetchBoardNames:  (userId) => {
    return db.query(`SELECT boards.boardname FROM boards INNER JOIN users_boards ON boards.id=user_board.board_id WHERE users_boads.user_id=${userId}`)
  }
}