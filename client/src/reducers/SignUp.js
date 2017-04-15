let initialState = {
  // username: '',
  // password: '',
  error: null,
  isValidating: false,
  isInvalid: false
}

const SignUp = (state=initialState, action) => {
  switch (action.type) {
    // case 'SIGN_UP_REQUEST':
    //   return {
    //     ...state,
    //     username: action.username,
    //     email: action.email,
    //     password: action.email
    //   }
    case 'SIGNING_IN':
      return {
        ...state,
        isValidating: true,
      }
    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        isValidating: false,
        isInvalid: true,
        error: 'Username or email has been taken!'
      }
    case 'SIGN_UP_SUCCESS':
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default SignUp

