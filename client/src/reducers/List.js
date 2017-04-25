//state of the board page

const initialState = {
  lists: null,
  fetching: false,
  createError: null,
  fetchError: null,
  isEditingList: false,
  isDragging: false
}

const list = (state = initialState, action) => {
  switch (action.type) {
    // ------------ CREATE ------------
    case 'LIST_CREATED':
      return {
        ...state
      }
    case 'CREATE_LIST_ERROR':
      return {
        ...state,
        createError: action.createError
      }
    // case 'CREATE_LIST':
    //   return {
    //     ...state,
    //     lists: lists
    //   }

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
        lists: action.lists
      }
    case 'FETCH_LISTS_ERROR':
      return {
        ...state,
        fetchError: action.fetchError
      }
    // ---------- TOGGLE DRAGGING ----------
    case 'TOGGLE_DRAGGING':
      return {
        ...state,
        isDragging: action.isDragging
      }
    default:
      return state
  }
}

export default list
