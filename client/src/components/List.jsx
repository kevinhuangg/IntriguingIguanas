import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { createTask } from '../actions/Task.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
    console.log('---> TASK PROPS', this.props)
  }

  onInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  onCreateTask() {
    this.props.createTask(this.state.text, this.props.list_id)
  }

  render() {
    return (
      <div>
        <h4>{ this.props.listname }</h4>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateTask }>CREATE TASK</button>

        { this.props.tasks.map((task, index) =>
          <Task
            key={ task.id }
            text={ task.text }
            assigned={ task.assigned }
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
    createTask: (taskname, list_id) => { dispatch(createTask(taskname, list_id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
