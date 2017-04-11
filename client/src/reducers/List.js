const initialState = {
  allList: [],
  createError: null,
  fetching: false,
  fetchError: null
}


export const List = (state = initialState, action) => {
  switch (action.type) {
    // ------------ CREATE ------------
    case 'LIST_CREATED':
      return {
        ...initialState
      }
    case 'CREATE_ERROR':
      return {
        ...state,
        error: action.error
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
        boardList: action.lists
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
