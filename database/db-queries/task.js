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
    return db.query(`SELECT coalesce(max(task_order),0) as max_order FROM tasks WHERE list_id=${list_id}`)
    .then(task => {
      var new_order = task.rows[0].max_order + 1000000;
      return db.query(`INSERT INTO tasks (list_id, text, task_order) VALUES (${list_id},'${text}',${new_order})`);
    })
    .catch(err => {
      console.log(err);
    })
  },
  assignTask: (task_id, user) => {
    return db.query(`UPDATE tasks SET assigned='${user}' WHERE id=${task_id}`);
  },
  fetchTasks: (list_id) => {
    return db.query(`SELECT * FROM tasks WHERE list_id=${list_id} order by task_order`);
  },
  updateTaskOrder: (data) => {
    return db.query(`UPDATE tasks SET task_order=${data.new_task_order}, list_id=${data.list_id} WHERE id=${data.task_id}`)
  }
}