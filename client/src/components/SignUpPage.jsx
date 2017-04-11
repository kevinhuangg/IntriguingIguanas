import React from 'react'
import { connect } from 'react-redux'

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
  handleSubmit() {

  }

  render() {
    return (
      <div>
        <form> 
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
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapDispatchToProps)(SignUpPage)