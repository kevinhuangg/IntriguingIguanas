const initialState = {
  usernames: []
}

function users(state = initialState, action) {
  switch (action.type) {
    case 'USERNAMES_FETCHED':
    return {
      ...state,
      usernames: action.usernames
    }
    default:
    return state;
  }
}

export default users;