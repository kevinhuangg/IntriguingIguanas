let initialState = {

}

const LogIn = (state=initialState, action) => {
  switch (action.type) {
  	case 'LOG_IN_REQUEST':
  	  return {

  	  }
  	case  'LOGGING_IN':
  	  return {

  	  }
  	case 'LOG_IN_ERROR':
  	  return {

  	  } 
  	case 'LOG_IN_SUCCESS': 
  	  return {

  	  }
  	default:
  	  return state
  }
}

export default LogIn