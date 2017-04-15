import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { editingListName, saveListName } from '../actions/List.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newListName: '',
      text: '',
      isEditing: false,
      tasks: []
    }
    this.onTaskInputChange = this.onTaskInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
    this.isEditingListName = this.isEditingListName.bind(this)
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
// ---------- TASKS ----------
  onTaskInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  onCreateTask() {
    this.props.socket.emit('create-task', { list_id: this.props.list_id, text: this.state.text })
  }

// ----------- UPDATE LIST NAME -----------
  isEditingListName() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onListNameInputChange(e) {
    this.setState({
      newListName: e.target.value
    })
  }

  updateListName() {
    this.props.socket.emit('update-list-name', { list_id: this.props.list_id, listname: this.state.newListName })
  }

  render() {
    return (
      <div>
        <div>
          <h4 onClick={ this.isEditingListName }>{ this.props.listname }</h4>
          { this.state.isEditing &&
            <div>
              <input type='text' value=''/>
              <button>SAVE</button>
            </div>
          }
        </div>
        <input onChange={ this.onTaskInputChange }/>
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
