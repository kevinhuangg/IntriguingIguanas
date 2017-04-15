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
      var username = JSON.parse(data.config.data).username
      var user_id = data.data.user_id
      console.log('USERID', user_id)
      const route = data.data.redirect
      dispatch(LogInSuccess(username, user_id))
      if (typeof route === 'string') {
        window.location = '/#' + route
      } 
    })
    .catch(error => dispatch(LogInFailure(error)))
  }
}
