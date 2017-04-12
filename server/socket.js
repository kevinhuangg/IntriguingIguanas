var sockets = require('sockets.io');
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
			
			socket.on('join-board', function(board_id) {
				socket.join(board, function () {
					currentBoard = board;
					console.log('joined ' + board)
				});
			})

			socket.on('fetch-board', function (board_id) {
				//query to the database to fetch specific board
				// .then(result) => {
					// socket.to(currentBoard).emit('board-fetched', result)
				//}
			});

			socket.on('disconnect', function () {
				console.log('client disconnected')
			});
		})

		return io;
	}


}