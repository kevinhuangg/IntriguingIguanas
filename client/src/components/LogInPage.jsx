import React from 'react'
import { connect } from 'react-redux'
import { LogIn } from '../actions/LogIn.js'

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
  }

  render() {
    // console.log(this.props)
    // console.log(LogIn)
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
            Password:
            <input 
              type='text'
              value={ this.state.password }
              onChange={ this.handlePasswordChange }
            />
          </label>
          <input 
            type='submit' 
            value='Login'
          />        
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    submitLogIn: (username, password) => { dispatch(LogIn(username, password)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)