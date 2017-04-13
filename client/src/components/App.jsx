import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import Lobby from './Lobby.jsx'
import HomePage from './HomePage.jsx'
import BoardPage from './BoardPage.jsx'
import SignUpPage from './SignUpPage.jsx'
import LogInPage from './LogInPage.jsx'
import UserProfilePage from './UserProfilePage.jsx'
import io from 'socket.io-client'

export class App extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
      socket: null
    }

    this.sendToHome = this.sendToHome.bind(this)
    this.sendToLobby = this.sendToLobby.bind(this)
    this.sendToSignup = this.sendToSignup.bind(this)
    this.sendToLogin = this.sendToLogin.bind(this)
    this.sendToUserProfile = this.sendToUserProfile.bind(this)

	}

  componentWillMount() {
    var socket = io();
    this.setState({
      socket: socket
    });
  }

  componentWillUnmount() {
    this.state.socket.emit('disconnect');
  }

  sendToHome() {
    hashHistory.push('/')
  }

  sendToLobby(taskBoardID) {
    if (taskBoardID) {
      hashHistory.push('/lobby/:taskBoardID')
      return
    }
    hashHistory.push('/lobby')
  }

  sendToSignup() {
    hashHistory.push('/signup')
  }

  sendToLogin() {
    hashHistory.push('/login')
  }

  sendToUserProfile(userId) {
    hashHistory.push('/lobby/user/:userId')
  }

  render () {
	  return (
      <div>
        <Router history={ hashHistory }>
          <Route
            path="/"
            component={ HomePage }
            sendToLogin={ this.sendToLogin }
            sendToSignup={ this.sendToSignup }
            socket={ this.state.socket }
          />
          <Route
            path="/lobby"
            component={ Lobby }
            socket={ this.state.socket }
          />
          <Route
            path="/lobby/:taskBoardId"
            component={ BoardPage }
            sendToLobby={ this.sendToLobby }
            socket={ this.state.socket }
          />
          <Route
            path="/signup"
            component={ SignUpPage }
          />
          <Route
            path="/login"
            component={ LogInPage }
          />
          <Route
            path="/lobby/user/:id"
            component= { UserProfilePage }
            socket={ this.state.socket }
          />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(App);
