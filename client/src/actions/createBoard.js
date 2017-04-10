import axios from 'axios';

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

function boardError(error) {
  return {
    type: 'BOARD_CREATED_ERROR',
    error
  }
}

export function createBoard(boardName) {
  return (dispatch) => {
    dispatch(creatingBoard())
    axios.post('', {boardName})
    .then(results => dispatch(boardCreated()))
    .catch(error => dispath(boardError(error)))
  }
}

