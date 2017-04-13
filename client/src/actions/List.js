import axios from 'axios'

// ------------ CREATE ------------
export const listCreated = () => {
  return {
    type: 'LIST_CREATED'
  }
}

export const createError = (error) => {
  return {
    type: 'CREATE_ERROR',
    error
  }
}

export function createList(listname, board_id) {
  return {
    type: 'CREATE_LIST',
    listname,
    board_id
  }
}

// export const createList = (listName, board_id) => {
//   return (dispatch) => {
//     axios.post('/list', {listName, board_id})
//     .then(res => dispatch(listCreated()))
//     .catch(error => dispatch(createError(error)))
//   }
// }

// ------------ FETCH ------------
export const fetchingLists = () => {
  return {
    type: 'FETCHING_LISTS'
  }
}

export const listsFetched = (lists) => {
  return {
    type: 'LISTS_FETCHED',
    allLists: lists
  }
}

export const fetchError = (error) => {
  return {
    type: 'FETCH_ERROR',
    error: error
  }
}

export const fetchLists = (board_id) => {
  return (dispatch) => {
    dispatch(fetchingLists())

    axios.post('/list', {board_id})
    .then(res => dispatch(listFetched(res.data)))
    .catch(error => dispatch(fetchError(error)))
  }
}