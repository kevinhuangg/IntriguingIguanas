const db = require('../db.js');

module.exports = {
  deleteTask: (task_id) => {
    return db.query(`DELETE FROM tasks WHERE id=${task_id}`);
  },
  editTask: (task_id, text) => {
    return db.query(`UPDATE tasks SET text='${text}' WHERE id=${task_id}`);
  },
  addTask: (text) => {
    return db.query(`INSERT INTO tasks (text) VALUES ('${text}')`);
  },
  assignTask: (task_id, user) => {
    return db.query(`UPDATE tasks SET assigned='${user}' WHERE id=${task_id}`);
  }
}