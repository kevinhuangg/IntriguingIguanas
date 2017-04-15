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

export function LogInSuccess(username, user_id) {
  return {
    type: 'LOG_IN_SUCCESS',
    username,
    user_id
  }
}

export function LogIn(username, password) {
  return function(dispatch) {
    dispatch(LoggingIn())
    axios.post('/login', {username, password})
    .then(data => {
      dispatch(LogInSuccess(JSON.parse(data.config.data).username, user_id))
      const route = data.data.redirect
      if (typeof route === 'string') {
        window.location = '/#' + route
      }
    })
    .catch(error => dispatch(LogInFailure(error)))
  }
}
