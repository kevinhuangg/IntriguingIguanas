module.exports = (rows) => {
  //helper function for checking if board object contains list already
  const listExists = (row, lists) => {
    for (let list of lists) {
      if (row.list_id === list.list_id) {
        return true
      }
    }
    return false
  }

  var board = {
    board_id: rows[0].board_id,
    boardname: rows[0].boardname,
    timestamp: rows[0].timestamp,
    lists: []
  };

  //iterate through rows
  rows.forEach(row => {
    if (!listExists(row, board.lists)) { //if list does not exist in board obj
      const listObj = {
        list_id: row.list_id,
        list_order: row.list_order,
        listname: row.listname,
        tasks: []
      }
      //if task id is defined
      if (row.id) {
        const taskObj = {
          id: row.id,
          text: row.text,
          task_order: row.task_order,
          assigned: row.assigned,
        }
        listObj.tasks.push(taskObj)
      }
      board.lists.push(listObj)

    } else { //if list does exist in board obj
      for (let listObj of board.lists) {
        if (row.list_id === listObj.list_id && row.id) {
          const taskObj = {
            id: row.id,
            text: row.text,
            task_order: row.task_order,
            assigned: row.assigned
          }
          listObj.tasks.push(taskObj)
        }
      }
    }
  })
  return board
}