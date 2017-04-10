import React from 'react'

class SignUpPage extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		username: '',
  		email: '',
  		password: ''
  	}
  
  	this.handleUsernameChange = this.handleUsernameChange.bind(this)
  	this.handlePasswordChange = this.handlePasswordChange.bind(this)
  	this.handleEmailChange = this.handleEmailChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePasswordChange() {
  	this.setState({ password: this.state.password })
  }
  handleUsernameChange() {
  	this.setState({ username: this.supertate.username })
  }
  handleEmailChange() {
  	this.setState({ email: this.state.email })  	
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
              <input type='text'
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

export default SignUpPage