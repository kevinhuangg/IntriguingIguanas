import React from 'react'
import { connect } from 'react-redux'
import { SignUp } from '../actions/SignUp.js'
import { Link } from 'react-router'

export class SignUpPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.submitSignUp(this.state.username, this.state.email, this.state.password)
    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label>
          Username:
            <input
              type='text'
              value={ this.state.username }
              onChange={ this.handleUsernameChange }
            />
          </label>
          <label>
          Email:
            <input
              type='text'
              value={ this.state.email }
              onChange={ this.handleEmailChange }
            />
          </label>
          <label>
          Password:
            <input
              type='text'
              value={ this.state.password }
              onChange={ this.handlePasswordChange }
            />
          </label>
          <input
            type='submit'
            value='Signup'
          />
        </form>
        <div>{ this.props.error }</div>
        Already a user?
          <Link to='/login'> Login</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    error: state.SignUp.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignUp: (username, email, password) => { dispatch(SignUp(username, email, password)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)