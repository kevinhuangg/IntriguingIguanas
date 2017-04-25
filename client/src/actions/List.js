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

// ------------ TOGGLE DRAGGING ------------
export const toggleDragging = (isDragging) => {
  return {
    type: TOGGLE_DRAGGING,
    isDragging
  }
}


