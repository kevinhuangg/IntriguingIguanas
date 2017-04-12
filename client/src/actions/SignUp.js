import axios from 'axios'

export function SigningUp() {
  return {
    type: 'SIGNING_UP'
  }
}

export function SignUpFailure(error) {
  return {
    type: 'SIGN_UP_FAILURE',
    error
  }
}

export function SignUpSuccess(data) {
  return {
    type: 'SIGN_UP_SUCCESS',
    data
  }
}

export function SignUp(username, email, password) {
  return (dispatch) => {
    dispatch(SigningUp())
    axios.post('', {username, email, password})
    .then(data => dispatch(SignUpSuccess(data)))
    .catch(error => dispatch(SignUpFailure(error)))
  }
}

