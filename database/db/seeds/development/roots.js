
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', email: 'user1@email.com', password: '123'},
        {username: 'user2', email: 'user2@email.com', password: '123'},
        {username: 'user2', email: 'user2@email.com', password: '123'}
      ]);
    }).then(() => {
      return knex('boards').del()
      .then(() => {
        return knex('boards').insert([
          {boardname: 'board1'},
          {boardname: 'board2'},
          {boardname: 'board3'}
        ]);
      });
    }).then(() => {
      return knex('users_boards').del()
      .then(() => {
        return knex('users_boards').insert([
          {user_id: 1, board_id: 1},
          {user_id: 2, board_id: 1},
          {user_id: 3, board_id: 2}
        ]);
      });
    }).then(() => {
      return knex('lists').del()
      .then(() => {
        return knex('lists').insert([
          {board_id: 1, listname: 'list1'},
          {board_id: 1, listname: 'list2'},
          {board_id: 2, listname: 'list1'}
        ]);
      });
    }).then(() => {
      return knex('tasks').del()
      .then(() => {
        return knex('tasks').insert([
          {list_id: 1, text: 'text1'},
          {list_id: 2, text: 'text2'},
          {list_id: 3, text: 'text3'}
        ]);
      });
    });
};
