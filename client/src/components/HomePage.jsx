import React from 'react'
import Lobby from './Lobby.jsx'
import BoardPage from './BoardPage.jsx'
import NavBar from './NavBar.jsx'
import { Link } from 'react-router'

export class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <div>
      <NavBar/>
      <div className="jumbotron">
        <img className="background"></img>
        <h1 className="homepage">Root.io is your one stop shop with all the tools necessary for live and remote collaboration.</h1>
        <h2 className="homepage">With shared project boards and video chat, your team can manage tasks seamlessly.</h2>
        <button className="ui primary button sign-up" onClick={ this.props.route.sendToSignup }><i className="add user icon"></i>SIGN UP</button>
        <h4 onClick={ this.props.route.sendToLogin }>Already a Root.io user? Log in.</h4>
      </div>
    </div>
    )
  }
}

export default HomePage

