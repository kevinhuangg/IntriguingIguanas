const initialState = {
  usernames: []
  error: null
}

function users(state = initialState, action) {
  switch (action.type) {
    case 'USERNAMES_FETCHED':
    return {
      ...state,
      usernames: action.usernames
    }
    case 'FETCH_USERNAMES_ERROR'
    return {
      ...state,
      error: action.error
    }
    default:
    return state;
  }
}

export default users;