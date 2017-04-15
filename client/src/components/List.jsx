import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { editingListName, saveListName } from '../actions/List.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      isEditing: false,
      tasks: []
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
    this.onEditListName = this.onEditListName.bind(this)
    this.updateListName = this.updateListName.bind(this)

    this.props.socket.on('update-listID-' + this.props.list_id, () => {
      this.props.socket.emit('fetch-tasks', { list_id: this.props.list_id })
    })

    let tasksFetched = 'tasks-fetched-listID-' + this.props.list_id
    this.props.socket.on(tasksFetched, (tasks) => {
      console.log('---> TASKS ON tasks-fetched', tasks)
      this.setState({
        tasks: tasks
      })
    })
  }

  componentWillMount() {
    this.props.socket.emit('fetch-tasks', { list_id: this.props.list_id })
  }

  onInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  onCreateTask() {
    this.props.socket.emit('create-task', { list_id: this.props.list_id, text: this.state.text })
  }

  onEditListName() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  updateListName() {
    this.props.saveListName()
  }

  render() {
    return (
      <div>
        <div>
          <h4 onClick={ this.onEditListName }>{ this.props.listname }</h4>
          { this.state.isEditing &&
            <div>
              <input type='text' value=''/>
              <button>SAVE</button>
            </div>
          }
        </div>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateTask }>CREATE TASK</button>

        { this.state.tasks.map((task, index) =>
          <Task
            key={ index }
            text={ task.text }
            // assigned={ this.state.assigned }
          />) }
      </div>
    )
  }
}

export default List
