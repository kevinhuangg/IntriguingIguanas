import React from 'react'
import { Link, hashHistory } from 'react-router'
import { Menu, Segment, Icon } from 'semantic-ui-react'

// const NavBar = () => (
//   <div className="ui blue inverted stackable menu">
//     <div className="ui container">
//       <img className='logo' src="./Logo.png"></img>
//     </div>
//     <a className="item">
//       <Link to='/login'><i className="user icon"></i>LOG IN</Link>
//     </a>
//     <a className="item">
//       <Link to='/signup'><i className="add user icon"></i>SIGN UP</Link>
//     </a>
//   </div>
// )

const NavBar = () => (
  <Segment color='teal' inverted>
    <Menu inverted secondary>
      <Menu.Item>
        <img src='./Logo.png' />
      </Menu.Item>

      <Menu.Menu position='right'>
      <Menu.Item><Link to='/login'>LOG IN<Icon name='user icon'/></Link></Menu.Item>
      <Menu.Item><Link to='/signup'>SIGN UP<Icon name='add user icon'/></Link></Menu.Item>
      </Menu.Menu>
    </Menu>
  </Segment>
)

export default NavBar






