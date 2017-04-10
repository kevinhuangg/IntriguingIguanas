import React from 'react'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='headerTitle'>
          <h1>Root.io</h1>
          <button onClick={ this.props.route.sendToLogin }>
            Login
          </button>
          <button onClick={ this.props.route.sendToSignup }>
            Signup
          </button>
        </div>
      </div>
    )
  }
}

export default HomePage