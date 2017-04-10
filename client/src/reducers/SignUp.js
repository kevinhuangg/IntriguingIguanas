let initialState = {
	username: ''
	password: ''
	isValidating: false, 
	isInvalid: false
}

const SignUp = (state=initialState, action) => {
  switch (action.type) {
  	case 'SIGN_UP_REQUEST':
  	  return {
  	  	...state,
  	  	username: action.username,
  	  	email: action.email,
  	  	password: action.email
  	  }
  	case 'SIGNING_IN':
  	  return {
  	  	...state,
  	  	isValidating: true,
  	  }
  	case 'SIGN_UP_FAILURE':
  	  return {
  	  	...state,	
  	  	isValidating: false
  	  	isInvalid: true
  	  }
  	case 'SIGN_UP_SUCCESS':
  	  return {
  	  	...state,
  	  }
    default:
      return state
  }	
}

export default SignUp

