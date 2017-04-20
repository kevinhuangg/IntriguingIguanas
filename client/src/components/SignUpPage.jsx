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
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header">
            <img src="../../dist/Logo.png" className="image"/>
            <div className="content">
              Create an Account
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
              <div className="input-name">Username</div>
                <input
                  type="text"
                  value={ this.state.username }
                  placeholder="Username"
                  onChange={ this.handleUsernameChange }
                />
              </div>
              <div className="field">
              <div className="input-name">Email</div>
                <input
                  type="text"
                  value={ this.state.email }
                  placeholder="Email"
                  onChange={ this.handleEmailChange }
                />
              </div>
              <div className="field">
              <div className="input-name">Password</div>
                <input
                  type="password"
                  value={ this.state.password }
                  onChange={ this.handlePasswordChange }
                  placeholder="Password"
                 />
              </div>
              <div className="input-name">{this.props.error}</div>
              <div className="ui fluid massive blue submit button" onClick={ this.handleSubmit }>Sign Up</div>
            </div>

            <div className="ui error message"></div>

          </form>

          <div className="ui message">
            Already a user? <Link to='/login'> Login</Link>
          </div>
        </div>
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