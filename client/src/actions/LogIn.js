export function LogInRequest(username, password) {
  return {
    type: 'LOG_IN_REQUEST',
    username,
    password
  }
}

export function LoggingIn() {
  return {
    type: 'LOGGING_IN'
  }
}

export function LogInFailure(error) {
  return {
    type: 'LOG_IN_FAILURE',
    error
  }
}

export function LogInSuccess(data) {
  return {
    type: 'LOG_IN_SUCCESS',
    data
  }
}

export function LogIn(username, password) {
  return (dispatch) => {
    dispatch(LogingIn())
    axios.post('', {username, password})
    .then(data => dispatch(LogInSuccess(data)))
    .catch(error => dispatch(LogInFailure(error)))
  }
}
