const db = require('../db.js');

module.exports = {
  deleteTask: (task_id) => {
    return db.query(`DELETE FROM tasks WHERE id=${task_id}`);
  },
  deleteTasksByListID: (list_id) => {
    return db.query(`DELETE FROM tasks WHERE list_id=${list_id}`);
  },
  updateTask: (task_id, text) => {
    return db.query(`UPDATE tasks SET text='${text}' WHERE id=${task_id}`);
  },
  addTask: (list_id, text) => {
    return db.query(`SELECT coalesce(max(current_order),0) as max_order FROM tasks WHERE list_id=${list_id}`)
    .then(task => {
      var new_order = task.rows[0].max_order + 500;
      return db.query(`INSERT INTO tasks (list_id, text, current_order) VALUES (${list_id},'${text}',${new_order})`);
    })
    .catch(err => {
      console.log(err);
    })
  },
  assignTask: (task_id, user) => {
    return db.query(`UPDATE tasks SET assigned='${user}' WHERE id=${task_id}`);
  },
  fetchTasks: (list_id) => {
    return db.query(`SELECT * FROM tasks WHERE list_id=${list_id} order by current_order`);
  },
  updateTaskOrder: (current_list_id, current_task_id, new_list_id, new_order) => {
    return db.query(`UPDATE tasks SET list_id=${new_list_id}, current_order=${new_order} WHERE id=${current_task_id}`);
  }
}