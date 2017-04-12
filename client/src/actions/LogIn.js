import axios from 'axios'

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
  console.log('hi',username);
  return function(dispatch) {
    console.log('2ndhi')
    dispatch(LoggingIn())
    axios.post('/login', {username, password})
    .then(data => dispatch(LogInSuccess(data)))
    .catch(error => dispatch(LogInFailure(error)))
  }
}
