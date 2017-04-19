const db = require('../db.js');

module.exports = {
  //fetch list to db
  fetchLists: (boardID) => {
    return db.query(`SELECT * FROM lists WHERE board_id=${boardID} order by current_order`)
  },
  //add list to db
  addList: (name, boardID) => {
    return db.query(`SELECT coalesce(max(current_order),0) as max_order FROM lists WHERE board_id=${boardID}`)
    .then(list => {
      var new_order = list.rows[0].max_order + 500;
      return db.query(`INSERT INTO lists (listname, board_id, current_order) VALUES ('${name}', ${boardID}, ${new_order})`)
    })
    .catch(err => {
      console.log(err);
    })
  },
  //update list name in db
  updateListName: (newName, listID) => {
    return db.query(`UPDATE lists SET listname='${newName}' WHERE id=${listID}`)
  },
  //delete task from db using list id
  deleteList: (listID) => {
    return db.query(`DELETE FROM lists WHERE id=${listID} RETURNING board_id`)
  },
}
