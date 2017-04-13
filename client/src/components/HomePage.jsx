import React from 'react'
import Lobby from './Lobby.jsx'
import BoardPage from './BoardPage.jsx'

export class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Root.io is your one stop shop with all the tools necessary for live and remote collaboration.</h1>
        <h2>With shared project boards and video chat, your team can manage tasks seamlessly.</h2>
        <button onClick={ this.props.route.sendToSignup }>Sign Up</button>
        <div onClick={ this.props.route.sendToLogin }>Already a Root.io user? Log in.</div>
      </div>
    )
  }
}

export default HomePage