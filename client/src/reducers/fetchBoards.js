const initialState = {
  boardlist: [],
  fetchingBoards: false,
  error: null
}

function fetchBoards(state=initialState, action) {
  switch (action.type) {
    case 'FETCHING_BOARDS':
      return {
        ...state,
        fetchingBoards: true
      }
    case 'BOARDS_LOADED':
      return {
        ...state,
        boardList: action.boards
      }
    case 'REQUEST_BOARDS_ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default fetchBoards