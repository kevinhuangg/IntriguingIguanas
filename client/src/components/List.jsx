import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { editingListName, saveListName } from '../actions/List.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentListName: this.props.listname,
      newListName: '',
      text: '',
      isEditing: false,
      tasks: []
    }
    this.onTaskInputChange = this.onTaskInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
    this.isEditingListName = this.isEditingListName.bind(this)
    this.updateListName = this.updateListName.bind(this)
    this.onListNameInputChange = this.onListNameInputChange.bind(this)

    var socket = this.props.socket

    socket.on('update-listID-' + this.props.list_id, () => {
      socket.emit('fetch-tasks', { list_id: this.props.list_id })
    })

    let tasksFetched = 'tasks-fetched-listID-' + this.props.list_id
    
    socket.on(tasksFetched, (tasks) => {
      console.log('---> TASKS ON tasks-fetched', tasks)
      this.setState({
        tasks: tasks
      })
    })

    socket.on('update-list-name-' + this.props.list_id, (res) => {
      this.setState({
        currentListName: res.listname
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
    this.setState({
      newListName: '',
      isEditing: !this.state.isEditing
    })
  }

  deleteList() {
    this.props.socket.emit('delete-list', { list_id: this.props.list_id })
  }

  render() {
    return (
      <div>
        <div>
          <h4 onClick={ this.isEditingListName }>{ this.state.currentListName }</h4>
          { this.state.isEditing &&
            <div>
            <input type='text' value={ this.state.newListName } onChange={ this.onListNameInputChange }/>
            <button onClick={ this.updateListName }>SAVE</button>
            <button onClick={ this.deleteList }>DELETE</button>
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
