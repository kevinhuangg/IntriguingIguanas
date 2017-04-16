// const { addList } = require('../database/db-queries/list.js')
const board = require('../database/db-queries/board.js')
const list = require('../database/db-queries/list.js')
const task = require('../database/db-queries/task.js')

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
          var room = data.taskBoardId.toString()

          list.fetchLists(data.taskBoardId)
            .then(lists => {
              socket.emit('update-board', lists)
              socket.to(room).emit('update-board', lists)
            })
          socket.join(room)
          io.of('/').in(room).clients(function(error, clients) {
            if (error) throw error;
            console.log(`Clients in room ${room}: ${clients}`);
          });
        // <------------- LISTS ------------->
        socket.on('create-list', function(data) {
          list.addList(data.name, data.boardId)
            .then(msg => {
              list.fetchLists(data.boardId)
                .then(lists => {
                  socket.emit('update-board', lists)
                  socket.to(room).emit('update-board', lists)
                })
                .catch(err => {
                  console.log('Retrieving board error')
                })
            })
            .catch(err => {
              console.log('Error creating list')
            })
        });

        socket.on('update-list-name', (req) => {
          list.updateListName(req.listname, req.list_id)
          .then(succes => {
            socket.emit('update-list-name-' + req.list_id, { listname: req.listname })
            socket.to(room).emit('update-list-name-' + req.list_id, { listname: req.listname })
          })
          .catch(err => {
            console.log('Error updating list name')
          })
        })

        socket.on('delete-list', (req) => {
          list.deleteList(req.listname, req.list_id)
          .then(succes => {
            socket.emit('update-list-name-' + req.list_id, { listname: req.listname })
            socket.to(room).emit('update-list-name-' + req.list_id, { listname: req.listname })
          })
          .catch(err => {
            console.log('Error updating list name')
          })
        })

        // ------------- TASKS -------------
        socket.on('create-task', function(data) {
          task.addTask(data.list_id, data.text)
            .then(results => {
              socket.emit('update-listID-' + data.list_id)
              socket.to(room).emit('update-listID-' + data.list_id)
            })
            .catch(err => {
              console.log('Error creating tasks', err)
            })
        });


        socket.on('fetch-tasks', (data) => {
          task.fetchTasks(data.list_id)
            .then(pgData => {
              let tasksFetched = 'tasks-fetched-listID-' + data.list_id

              socket.emit(tasksFetched, pgData.rows)
              socket.to(room).emit(tasksFetched, pgData.rows)
            })
            .catch(err => {
              console.log('Retrieving tasks error')
            })
        })

        socket.on('disconnect', function() {
          console.log('client disconnected')
        });

        return io;
      })
    })
  }
}