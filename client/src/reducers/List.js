const initialState = {
  board_id: 1,
  allLists: [{listname: 'GROCERIES', board_id: 1}, {listname: 'TO-DOS', board_id: 1}],
  createError: null,
  fetching: false,
  fetchError: null
}

const list = (state = initialState, action) => {
  switch (action.type) {
    // ------------ CREATE ------------
    case 'LIST_CREATED':
      return {
        ...state
      }
    case 'CREATE_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'CREATE_LIST':
      return {
        ...state,
        allLists: [...state.allLists, {listname: action.listname, board_id: action.board_id}]
      }

    // ------------ FETCH ------------
    case 'FETCHING_LISTS':
      // for UX purpose – might take long to fetch
      return {
        ...state,
        fetchingLists: true
      }
    case 'LISTS_FETCHED':
      return {
        ...state,
        allLists: action.allLists
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
}

export default list