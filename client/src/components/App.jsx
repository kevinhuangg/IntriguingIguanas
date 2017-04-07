import React from 'react';
import { connect } from 'react-redux';
import List from './List.jsx';
import AddTaskForm from './addTaskForm.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

  render () {
  	// console.log('addTaskForm', AddTaskForm)
	 return (
	   <div>
  	     <List/>
	     <AddTaskForm/>
  	   </div> 
	 )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}


export default connect(mapStateToProps)(App);