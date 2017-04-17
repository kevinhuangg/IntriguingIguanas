//endpoint for lobby routes
//import lobby related db queries
const Board = require('../../database/db-queries/board.js');

module.exports.getUserBoards = (req, res, next) => {
  var user_id = req.query.user_id
  Board.fetchBoardNames(user_id)
  .then(results => {
    res.send(results.rows)
  })
  .catch(error => {
    console.log(error)
  })
}

module.exports.createBoard = (req, res, next) => {
  var name = req.body.boardname;
  var user_id = req.body.user_id;
  Board.addBoard(name, user_id)
  .then(results => {
    res.send();
  })
  .catch(error => {
    console.log(error);
  })
}

module.exports.editBoard = (req, res, next) => {
  var board_id = req.body.params.board_id;
  var name = req.body.params.boardname;
  console.log(board_id, name, "MEOW")
  Board.editBoardName(name, board_id)
  .then(results => {
    res.send();
  })
  .catch(error => {
    console.log(error);
  })
}

module.exports.deleteBoard = (req, res, next) => {
  var board_id = req.query.board_id;
  Board.deleteBoard(board_id)
  .then(results => {
    res.send();
  })
  .catch(error => {
    console.log(error);
  })
}