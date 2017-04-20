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
  updateTaskOrder: (data) => {
  if (data.array[1]) {
    var first_task = data.array[0].id;
    var second_task = data.array[1].id;
    var first_order = data.array[0].current_order;
    var second_order = data.array[1].current_order;
    var list_id = data.array[0].list_id;
      return db.query(`UPDATE tasks SET current_order=${second_order} WHERE id=${first_task}`)
      .then(result => {
        return db.query(`UPDATE tasks SET current_order=${first_order} WHERE id=${second_task}`)
      })
      .catch(err => {
        console.log(err);
    })
    } else {
      return db.query(`SELECT * from tasks`)
    }
  }
}