const initialState = {
  boards: [],
  board: null,
  fetchingBoard: false,
  fetchBoardError: null,
  fetchingBoards: false,
  creatingBoard: false,
  deletingBoard: false,
  createError: null,
  deleteError: null,
  fetchBoardsError: null
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

    // ------------ DELETE ------------
    case 'DELETING_BOARD':
      return {
        ...state,
        deletingBoard: true
      }
    case 'BOARD_DELETED':
      return {
        ...initialState
      }
    case 'DELETE_BOARD_ERROR':
      return {
        ...state,
        deletingBoard: false,
        deleteError: action.deleteError
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
        fetchBoardsError: action.fetchError
      }

    case 'FETCHING_BOARD':
      return {
        ...state,
        fetchingBoard: true
      }

    case 'BOARD_FETCHED':
      return {
        ...state,
        board: action.board,
        fetchingBoard: false
      }

    case 'FETCH_BOARD_ERROR':
      return {
        ...state,
        fetchBoardError: action.fetchError
      }
    default:
      return state;
  }
}

export default board;