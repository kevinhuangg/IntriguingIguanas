import React from 'react'
import BoardListPage from './BoardListPage.jsx'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Root.io is your one stop shop with all the tools necessary for live and remote collaboration.</h1>
        <h2>With shared project boards and video chat, your team can manage tasks seamlessly.</h2> 
        <button>Sign Up</button>
        <div>Already a Root.io user? Log in.</div>
      </div>
    )
  }
}

export default HomePage