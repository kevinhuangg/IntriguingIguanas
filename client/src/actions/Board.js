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

export function createBoard(boardName) {
  return (dispatch) => {
    dispatch(creatingBoard())

    axios.post('/board', {boardName})
    .then(results => dispatch(boardCreated()))
    .catch(error => dispatch(boardError(error)))
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
    fetchError: fetchError
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
