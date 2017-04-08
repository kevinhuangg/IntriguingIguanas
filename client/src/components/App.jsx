import React from 'react'
import { connect } from 'react-redux'
import List from './List.jsx'
import AddTaskForm from './addTaskForm.jsx'
import CreateList from '../actions/Board.js'
import { toggleToDo } from '../actions/List.js'

class App extends React.Component {
  constructor(props) {
	  super(props);
  
    this.handleAddList = this.handleAddList.bind(this)
    this.toggleList = this.toggleList.bind(this)
  }

  handleAddList() {

  }

  toggleList() {
    this.props.toggleList()
  }

  render () {
  	// console.log('addTaskForm', AddTaskForm)
    // console.log(CreateList, "LIST!")
    // console.log(this.props.onClickCreateList, "CREATE LIST")

	 let onClickCreateList = this.props.onClickCreateList
   return (
	   <div onClick={this.toggleList}>
	     <button onClick={ () => { onClickCreateList('Hello') } }/>
  	   {this.props.show && <List/>}
	     <AddTaskForm/>
  	 </div> 
	 )
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.list.show
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickCreateList: (name) => {
      dispatch(CreateList(name))
    },
    toggleList: () => {
      dispatch(toggleToDo())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);