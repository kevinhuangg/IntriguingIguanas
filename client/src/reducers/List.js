//state of the board page

const initialState = {
  lists: [],

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
    // ---------- EDIT ----------
    // ----------MOVE TASK-------
    case 'MOVE_TASK': {
      let newLists = [...state.lists];
      let {currentX, currentY, nextX, nextY} = action;
      if (currentX === nextX) {
        newLists[currentX].tasks.splice(nextY, 0, newLists[currentX].tasks.splice(currentY, 1)[0])
      } else {
        newLists[nextX].tasks.splice(nextY, 0, newLists[currentX].tasks[currentY])
        newLists[currentX].tasks.splice(currentY, 1)
      }
      return {
        ...state,
        lists: newLists
      }
    }
    // ---------- MOVE LIST ----------
    case 'MOVE_LIST':
      {
        const newLists = [...state.lists];
        const { currentX, nextX } = action;
        const task = newLists.splice(nextX, 1)[0];

        newLists.splice(nextX, 0, task);
        return { ...state,
                lists: newLists }
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