let initialState = {
  username: '',
  password: '',
  isValidating: false,
  isInvalid: false,
}

const LogIn = (state=initialState, action) => {
  switch (action.type) {
  	case 'LOG_IN_REQUEST':
  	  return {
  	    ...state,
  	    username: action.username,
  	    password: action.password
  	  }
  	case  'LOGGING_IN':
  	  return {
  	  	...state,
  	  	isValidating: true
  	  }
  	case 'LOG_IN_ERROR':
  	  return {
  	  	...state,
  	  	isValidating: false,
  	  	isInvalid: true
  	  } 
  	case 'LOG_IN_SUCCESS': 
  	  return {
  	  	...initialState,
  	  }
  	default:
  	  return state
  }
}

export default LogIn