import axios from 'axios';

// ------------ CREATE ------------
function creatingBoard() {
  return {
    type: 'CREATING_BOARD'
  }
}

function boardCreated() {
  return {
    type: 'BOARD_CREATED'
  }
}

function boardError(createError) {
  return {
    type: 'CREATE_BOARD_ERROR',
    createError
  }
}

export function createBoard(boardName, user_id) {
  return (dispatch) => {
    dispatch(creatingBoard())

    axios.post('/api/lobby', {
      boardname: boardName,
      user_id: user_id
    })
    .then(results => {
      dispatch(boardCreated());
    })
    .then(() => {
      dispatch(fetchBoards(user_id));
    })
    .catch(error => dispatch(boardError(error)))
  }
}

// ------------ EDIT ------------
function editingBoard() {
  return {
    type: 'EDITING_BOARD'
  }
}

function boardEdited() {
  return {
    type: 'BOARD_EDITED'
  }
}

function editBoardError(editError) {
  return {
    type: 'EDIT_BOARD_ERROR',
    editError
  }
}

export function editBoard(boardName, board_id, user_id) {
  return (dispatch) => {
    dispatch(editingBoard())

    axios.put('/api/lobby', {
      params: {
      boardname: boardName,
      board_id: board_id,
      user_id: user_id
    }
    })
    .then(results => {
      dispatch(boardEdited());
    })
    .then(() => {
      dispatch(fetchBoards(user_id));
    })
    .catch(error => dispatch(editBoardError(error)))
  }
}

// ------------ DELETE ------------
function deletingBoard() {
  return {
    type: 'DELETING_BOARD'
  }
}

function boardDeleted() {
  return {
    type: 'BOARD_DELETED'
  }
}

function deleteBoardError(deleteError) {
  return {
    type: 'DELETE_BOARD_ERROR',
    deleteError
  }
}

export function deleteBoard(board_id , user_id) {
  return (dispatch) => {
    dispatch(deletingBoard())

    axios.delete('/api/lobby', {
      params: {
      board_id: board_id,
      user_id: user_id
    }
    })
    .then(results => {
      dispatch(boardDeleted());
    })
    .then(() => {
      dispatch(fetchBoards(user_id));
    })
    .catch(error => dispatch(deleteBoardError(error)))
  }
}

// ------------- MOVE ----------------
export const moveList = (currentX, nextX) => {
  return {
    type: 'MOVE_LIST',
    currentX,
    nextX
  }
}
// ------------ FETCH ------------
function fetchingBoards() {
  return {
    type: 'FETCHING_BOARDS'
  }
}

function boardsFetched(boards) {
  return {
    type: 'BOARDS_FETCHED',
    boards: boards
  }
}

function fetchBoardsError(fetchError) {
  return {
    type: 'FETCH_BOARDS_ERROR',
    fetchBoardsError: fetchError
  }
}

export function fetchBoards(user_id) {
  return (dispatch) => {
    dispatch(fetchingBoards())
    axios.get('/api/lobby', {
      params: {
        user_id : user_id
      }})
    .then(results => {
      dispatch(boardsFetched(results.data))
    })
    .catch(error => dispatch(fetchBoardsError(error)))
  }
}

// function fetchingBoard() {
//   return {
//     type: 'FETCH_BOARD'
//   }
// }

export function boardFetched(board) {
  return {
    type: 'BOARD_FETCHED',
    board: board
  }
}

export function fetchBoardError(fetchError) {
  return {
    type: 'FETCH_BOARD_ERROR',
    fetchBoardError: fetchBoardError
  }
}
