import React from 'react';
import { connect } from 'react-redux';
import List from './List.jsx';
import AddTaskForm from './addTaskForm.jsx';
import AddList from './AddList.jsx'

class App extends React.Component {
  constructor(props) {
	  super(props);
  
    this.handleAddList = this.handleAddList.bind(this)
  }

  handleAddList() {

  }

  render () {
  	// console.log('addTaskForm', AddTaskForm)
	 return (
	   <div>
	     <AddList/>
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