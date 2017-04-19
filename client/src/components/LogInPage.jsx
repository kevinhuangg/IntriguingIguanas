import React from 'react'
import { connect } from 'react-redux'
import { LogIn } from '../actions/LogIn.js'
import { Link } from 'react-router'

export class LogInPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.submitLogIn(this.state.username, this.state.password)
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            <img src="../../dist/Logo.png" className="image"/>
            <div className="content">
              Log in to Root.io
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="text"
                    value={ this.state.username }
                    placeholder="Username"
                    onChange={ this.handleUsernameChange }
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    value={ this.state.password }
                    onChange={ this.handlePasswordChange }
                    placeholder="Password"
                   />
                </div>
              </div>
              <div className="ui fluid massive blue submit button" onClick={ this.handleSubmit }>Login</div>
            </div>

            <div className="ui error message"></div>

          </form>

          <div className="ui message">
            New to us? <Link to='/signup'> Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    error: state.LogIn.error
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    submitLogIn: (username, password) => { dispatch(LogIn(username, password)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)
