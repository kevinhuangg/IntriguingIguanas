import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

  render () {
	  return (<div>Hello World!</div>)
  }
}

const mapStateToProps = (state) => {
  return {
  }
}


export default connect(mapStateToProps)(App);

