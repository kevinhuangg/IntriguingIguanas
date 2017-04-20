// const { addList } = require('../database/db-queries/list.js')
const board = require('../database/db-queries/board.js')
const list = require('../database/db-queries/list.js')
const task = require('../database/db-queries/task.js')
const User = require('../database/db-queries/User.js')

var sockets = require('socket.io');
var io;
//import database queries

var rooms = [];
var currentBoard = null;

module.exports = {
  io: function() {
    return io;
  },
  init: function(server) {
    io = sockets(server);

    io.on('connection', function(socket) {
      console.log('Connected to ' + socket);

      socket.on('join-board', function(data) {
        var room = data.board_id.toString()

        list.fetchLists(data.board_id)
          .then(lists => {
            io.in(room).emit('update-board', lists)
          });

        socket.join(room)
        io.of('/').in(room).clients(function(error, clients) {
          if (error) throw error;
          console.log(`Clients in room ${room}: ${clients}`);
        });

        // -------------- LISTS --------------
        socket.on('create-list', function(req) {
          list.addList(req.name, req.board_id)
          .then(msg => {
            list.fetchLists(req.board_id)
              .then(lists => {
                io.in(room).emit('update-board', lists)
              })
              .catch(err => {
                console.log('Retrieving board error')
              })
            })
            .catch(err => {
              console.log('CREATE LIST ERR')
            })
        });

        socket.on('update-list-name', (req) => {
          list.updateListName(req.listname, req.list_id)
          .then(success => {
            io.in(room).emit(`update-list-name-${req.list_id}`, { listname: req.listname })
          })
          .catch(err => {
            console.log('UPDATE LIST ERR')
          })
        });

        socket.on('delete-list', (req) => {
          console.log('list_id', req.list_id)
          list.deleteList(req.list_id)
          .then(pgData => {
            console.log('pgData', pgData)
            list.fetchLists(pgData.rows[0].board_id)
            .then(lists => {
              console.log('>> LISTS', lists)
              io.in(room).emit('update-board', lists)
            })
            .catch(err => {
              console.log('UPDATE BOARD ERR')
            })
          })
          .catch(err => {
            console.log('DELETE LIST ERR')
          })
        });

        socket.on('list-order-update', (req) => {
          console.log(req.array);
        });

        // -------------- TASKS --------------
        socket.on('fetch-tasks', (req) => {
          task.fetchTasks(req.list_id)
          .then(pgData => {
            let tasksFetched = `tasks-fetched-listID-${req.list_id}`

            io.in(room).emit(tasksFetched, pgData.rows)
          })
          .catch(err => {
            console.log('FETCH TASKS ERR')
          })
        });

        socket.on('add-task', function(req) {
          task.addTask(req.list_id, req.text)
          .then(success => {
            task.fetchTasks(req.list_id)
            .then(pgData => {
              let tasksFetched = `tasks-fetched-listID-${req.list_id}`

              io.in(room).emit(tasksFetched, pgData.rows)
            })
            .catch(err => {
              console.log('FETCH TASKS ERR', err)
            })
          })
          .catch(err => {
            console.log('ADD TASK ERR', err)
          })
        });

        socket.on('update-task', (req) => {
          task.updateTask(req.task_id, req.newText)
          .then(success => {
            task.fetchTasks(req.list_id)
            .then(pgData => {
              let tasksFetched = `tasks-fetched-listID-${req.list_id}`

              io.in(room).emit(tasksFetched, pgData.rows)
            })
            .catch(err => {
              console.log('FETCH TASKS ERR', err)
            })
          })
          .catch(err => {
            console.log('UPDATE TASK ERR', err)
          })
        });

        socket.on('delete-task', (req) => {
          task.deleteTask(req.task_id)
          .then(success => {
            task.fetchTasks(req.list_id)
            .then(pgData => {
              let tasksFetched = `tasks-fetched-listID-${req.list_id}`

              io.in(room).emit(tasksFetched, pgData.rows)
            })
            .catch(err => {
              console.log('FETCH TASKS ERR', err)
            })
          })
          .catch(err => {
            console.log('DELETE TASK ERR', err)
          })
        });

        //------------ INVITE USERS ------------
        socket.on('invite-user-to-board', (data) => {
          User.addUserToBoard(data.invitee, data.board_id)
          .then(pgData => {
            console.log(`${data.invitee} added to board id of ${data.board_id}`)
          })
          .catch(err => {
            console.log(err)
          })
        })

        //------------ MOVE LIST ------------
        socket.on('list-order-update', (data) => {
          list.updateListOrder(data)
          .then(success => {
            return list.fetchLists(data.array[0].board_id)
          })
          .then(lists => {
            console.log('>> LISTS', lists)
            io.in(room).emit('update-board', lists)
          })
          .catch(err => {
            console.log(err)
          })
        })

        //------------ MOVE TASK ------------
        socket.on('task-order-update-vertical', (data) => {
          console.log(data, "DATA")
          task.updateTaskOrder(data)
          .then(success => {
            console.log(success, "SUCCESS")
            return task.fetchTasks(data.array[0].list_id)
          })
          .then(pgData => {
            console.log(pgData,"PGDATA")
            let tasksFetched = `tasks-fetched-listID-${data.array[0].list_id}`
            io.in(room).emit(tasksFetched, pgData.rows)
          })
          .catch(err => {
            console.log(err)
          })
        })

        //------------ VIDEO CHAT ------------
        socket.on('start-video-chat', (stream) => {
          console.log(stream, "STREAMMM")
          socket.to(room).emit('initiate-peer-video', stream)
        })

        //------------- DISCONNECT -------------
        socket.on('disconnect', function() {
          // socket.disconnect()
          console.log('Client disconnected!')
        });

        return io;
      })
    })
  }
}