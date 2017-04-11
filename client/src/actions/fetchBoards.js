import axois from 'axios'

function fetchingBoards() {
  return {
    type: 'FETCHING_BOARDS'
  }
}

function boardsReceived(boards) {
  return {
    type: 'BOARDS_LOADED',
    boardlist: boards
  }
}

function receiveBoardsError(error) {
  return {
    type: 'REQUEST_BOARDS_ERROR',
    error: error
  }
}

export function fetchBoards() {
  return (dispatch) => {
    dispatch(fetchingBoards())
    axios.get('')
    .then(results => dispatch(boardsReceived(results.data)))
    .catch(error => dispatch(receiveBoardsError(error)))
  }
}