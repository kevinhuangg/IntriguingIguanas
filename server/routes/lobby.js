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
  console.log(name, user_id)
  Board.addBoard(name, user_id)
  .then(results => {
    res.send();
  })
  .catch(error => {
    console.log(error);
  })
}