export function SignUpRequest(username, email, password) {
  return {
  	type: 'SIGN_UP_REQUEST',
  	username,
  	email,
  	password
  }
}

export function SigningIn() {
  return {
    type: 'SIGNING_IN'
  }
}

export function SignUpFailure() {
  return {
  	type: 'SIGN_UP_FAILURE',
  }
}

export function SignUpSuccess() {
  return {
    type: 'SIGN_UP_SUCCESS'
  }
}

