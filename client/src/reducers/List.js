const initialState = {
  error: null
}

function createBoard(state = initialState, action) {
  switch (action.type) {
    case 'LIST_CREATED':
      return {
        ...initialState
      }
    case 'ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default List