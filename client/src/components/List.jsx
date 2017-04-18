import React from 'react'
import Task from './Task.jsx'

import { Grid, Card } from 'semantic-ui-react'

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
    this.addTask = this.addTask.bind(this)

    this.isEditingListName = this.isEditingListName.bind(this)
    this.onListNameInputChange = this.onListNameInputChange.bind(this)
    this.updateListName = this.updateListName.bind(this)
    this.deleteList = this.deleteList.bind(this)

    var socket = this.props.socket

    // --------- TASKS FETCHED ---------
    let tasksFetched = `tasks-fetched-listID-${this.props.list_id}`
    socket.on(tasksFetched, (tasks) => {
      this.setState({
        tasks: tasks
      })
    })

    socket.on(`update-list-name-${this.props.list_id}`, (res) => {
      this.setState({
        currentListName: res.listname
      })
    })
  }

  componentWillMount() {
    this.props.socket.emit('fetch-tasks', {
      list_id: this.props.list_id
    })
  }

// ---------- ADD TASK ----------
  onTaskInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  addTask() {
    this.props.socket.emit('add-task', {
      list_id: this.props.list_id,
      text: this.state.text
    })
    this.setState({
      text: ''
    })
  }

// ----------- EDIT/DELETE LIST -----------
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
    this.props.socket.emit('update-list-name', {
      list_id: this.props.list_id,
      listname: this.state.newListName
    })
    this.setState({
      newListName: '',
      isEditing: false
    })
  }

  deleteList() {
    this.props.socket.emit('delete-list', {
      list_id: this.props.list_id
    })
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Content>
          <Card.Header onClick={ this.isEditingListName }>
            { this.state.currentListName }
          </Card.Header>
          </Card.Content>

          <Card.Content>
          { this.state.isEditing &&
            <div>
            <input type='text' value={ this.state.newListName } onChange={ this.onListNameInputChange }/>
            <button onClick={ this.updateListName }>SAVE</button>
            <button onClick={ this.deleteList }>DELETE</button>
            </div>
          }
        <input onChange={ this.onTaskInputChange } value={ this.state.text } />
        <button onClick={ this.addTask }>ADD TASK</button>

        { this.state.tasks.map(task =>
          <Task
            key={ task.id }
            text={ task.text }
            task_id={ task.id }
            list_id={ task.list_id }
            socket={ this.props.socket }
            // assigned={ task.assigned }
          />) }
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default List
