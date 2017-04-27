import React from 'react'
import { Link, hashHistory } from 'react-router'
import { Menu, Segment, Icon } from 'semantic-ui-react'

const NavBar = () => (
  <div className="ui blue inverted stackable menu">
    <div className="ui container">
      <img className='logo' src="./Logo.png"></img>
    </div>
    <a className="item">
      <Link to='/login'><i className="user icon"></i>LOG IN</Link>
    </a>
    <a className="item">
      <Link to='/signup'><i className="add user icon"></i>SIGN UP</Link>
    </a>
  </div>
)

export default NavBar






