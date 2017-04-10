import React from 'react'

class LogInPage extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		username: '',
  		password: ''
  	}
  
  	this.handleUsernameChange = this.handleUsernameChange.bind(this)
  	this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handlePasswordChange() {
  	this.setState({ password: this.state.password })
  }
  handleUsernameChange() {
  	this.setState({ username: this.state.username })
  }

  render() {
	  return (
	    <div>
	    	<form> 
	    	  <label>
	    	    Username:
            <input type='text' 
              value={ this.state.username } 
              onChange={ this.handleUsernameChange }
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
            value='Login'
          />        
	      </form>

	    </div>
	)
  }
}

export default LogInPage