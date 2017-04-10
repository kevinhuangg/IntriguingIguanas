import React from 'react'
import { connect } from 'react-redux'

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

  handleUsernameChange() {
  	this.setState({ username: this.state.username })
  }
  handlePasswordChange() {
    this.setState({ password: this.state.password })
  }
  handleSubmit() {

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

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapDispatchToProps)(LogInPage)