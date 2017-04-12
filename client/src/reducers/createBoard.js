const initialState = {
  creatingBoard: false,
  error: null
}

function createBoard(state = initialState, action) {
  switch (action.type) {
    case 'CREATING_BOARD':
      return {
        ...state,
        creatingBoard: true
      }
    case 'BOARD_CREATED':
      return {
        ...initialState
      }
    case 'BOARD_CREATED_ERROR':
      return {
        ...state,
        creatingBoard: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default createBoard;