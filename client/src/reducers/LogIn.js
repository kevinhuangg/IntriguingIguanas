let initialState = {
  username: '',
  password: '',
  isFetching: false,
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
  	  	isFetching: true
  	  }
  	case 'LOG_IN_ERROR':
  	  return {
  	  	...state,
  	  	isFetching: false,
  	  	isInvalid: true
  	  } 
  	case 'LOG_IN_SUCCESS': 
  	  return {
  	  	...state,

  	  }
  	default:
  	  return state
  }
}

export default LogIn