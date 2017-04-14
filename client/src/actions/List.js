import axios from 'axios'

// ------------ CREATE ------------
export const listCreated = () => {
  return {
    type: 'LIST_CREATED'
  }
}

export const createError = (createError) => {
  return {
    type: 'CREATE_LIST_ERROR',
    createError
  }
}

export function createList(listname, board_id) {
  return {
    type: 'CREATE_LIST',
    listname,
    board_id
  }
}

// ------------ FETCH ------------
export const fetchingLists = () => {
  return {
    type: 'FETCHING_LISTS'
  }
}

export const listsFetched = (lists) => {
  return {
    type: 'LISTS_FETCHED',
    lists: lists
  }
}

export const fetchListsError = (fetchError) => {
  return {
    type: 'FETCH_LISTS_ERROR',
    fetchError
  }
}

// ------------UPDATE ------------------
function updateBoard(boardname) {
  return {
    type: 'UPDATE_BOARD',
    boardname,
    
  }
}

// export const fetchLists = (board_id) => {
//   return (dispatch) => {
//     dispatch(fetchingLists())

//     axios.post('/list', {board_id})
//     .then(res => dispatch(listsFetched(res.data)))
//     .catch(error => dispatch(fetchListsError(error)))
//   }
// }