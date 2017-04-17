const initialState = {
  boards: [],

  fetchingBoards: false,
  creatingBoard: false,
  createError: null,
  fetchError: null
}

function board(state = initialState, action) {
  switch (action.type) {
    // ------------ CREATE ------------
    case 'CREATING_BOARD':
      return {
        ...state,
        creatingBoard: true
      }
    case 'BOARD_CREATED':
      return {
        ...initialState
      }
    case 'CREATE_BOARD_ERROR':
      return {
        ...state,
        creatingBoard: false,
        createError: action.createError
      }

    // ------------ FETCH ------------
    case 'FETCHING_BOARDS':
      return {
        ...state,
        fetchingBoards: true
      }
    case 'BOARDS_FETCHED':
      return {
        ...state,
        boards: action.boards,
        fetchingBoards: false,
        creatingBoard: false,
        createError: null,
        fetchError: null
      }
    case 'FETCH_BOARDS_ERROR':
      return {
        ...state,
        fetchError: action.fetchError
      }

    default:
      return state;
  }
}

export default board;