import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { createTask } from '../actions/Task.js'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
  }

  onInputChange(e) {
    this.setState({
      taskName: e.target.value
    })
  }

  onCreateTask() {
    this.props.createTask(this.state.taskName, this.props.list_id)
  }

  render() {
    console.log('---> TASK PROPS', this.props)
    return (
      <div>
        <div>{this.props.listname}</div>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateTask }>CREATE TASK</button>

        { this.props.tasks.map((task, index) =>
          <Task
            key={ task.id }
            taskname={ task.taskname }
            index={ index }
          />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list,
    // PROBLEM HERE!
    list_id: state.list.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (taskname, list_id) => { dispatch(createList(taskname, list_id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
