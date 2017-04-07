import React from 'react'
import { connect } from 'react-redux'
import List from './List.jsx'
import AddTaskForm from './addTaskForm.jsx'
import CreateList from '../actions/Board.js'

class App extends React.Component {
  constructor(props) {
	  super(props);
  
    this.handleAddList = this.handleAddList.bind(this)
  }

  handleAddList() {

  }

  render () {
  	// console.log('addTaskForm', AddTaskForm)
    console.log(CreateList, "LIST!")
    // console.log(this.props.onClickCreateList, "CREATE LIST")
	 let onClickCreateList = this.props.onClickCreateList
   return (
	   <div>
	     <button onClick={ () => { onClickCreateList('Hello') } }/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onClickCreateList: (name) => {
      dispatch(CreateList(name))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);