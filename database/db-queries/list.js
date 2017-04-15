const db = require('../db.js');

module.exports = {
  //fetch list to db
  fetchLists: (boardID) => {
    return db.query(`SELECT * FROM lists WHERE board_id=${boardID}`)
  },
  //add list to db
  addList: (name, boardID) => {
    return db.query(`INSERT INTO lists (listname, board_id) VALUES ('${name}', ${boardID})`)
  },
  //update list name in db
  updateListName: (newName, listID) => {
    return db.query(`UPDATE lists SET listname='${newName}' WHERE id=${listID}`)
  },
  //delete task from db using list id
  deleteList: (listID) => {
    return db.query(`DELETE FROM lists WHERE id=${listID}`)
  },

}
