let initialState = {
  username: null, 
  error: null,
  isValidating: false,
  isInvalid: false,
}

const LogIn = (state=initialState, action) => {
  switch (action.type) {
    case 'LOGGING_IN':
      return {
        ...state,
        isValidating: true
      }
    case 'LOG_IN_ERROR':
      return {
        ...state,
        isValidating: false,
        isInvalid: true,
        error: action.error
      } 
    case 'LOG_IN_SUCCESS': 
      return {
        ...initialState,
        username: action.username
      }
    default:
      return state
  }
}

export default LogIn
