const { addList } = require('../database/db-queries/list.js')
const { fetchBoard } = require('../database/db-queries/board.js')

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
				// console.log( typeof data.taskBoardId)
				var room = data.taskBoardId
				socket.join(room)
				console.log('joined ' + room)
				io.of('/').in(room).clients(function(error, clients) {
					if (error) throw error;
					console.log(`Clients in room ${room}: ${clients}`);
				});

				//socket listening to the 'create list event'
				socket.on('create-list', function(data) {
					// console.log('create list socket fired.', data)
					addList(data.name, data.boardId)
					.then(msg => {
						console.log('List created', msg)
						fetchBoard(data.boardId)
						.then(board => {
						  // console.log('Retrieved board', board)
						  socket.emit('update-board', board)
						})
						.catch(err => {
							console.log('Retrieving board error')
						})
					})
					.catch(err => {
						console.log('Error creating list', err)
					})


				});

			})

			socket.on('disconnect', function () {
				console.log('client disconnected')
			});
		})

		return io;
	}

}