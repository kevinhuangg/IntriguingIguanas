import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { tasksFetched } from '../actions/Task.js'
import { createTask } from '../actions/Task.js'
import { editingListName, saveListName } from '../actions/List.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      isEditing: false
      tasks: []
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
    this.onEditListName = this.onEditListName.bind(this)
    this.saveListName = this.saveListName.bind(this)

    var socket = this.props.socket

    socket.on('update-lists', () => {
      this.props.socket.on('update-list', (res) => {
      this.props.tasksFetched(res.rows)
    })

    this.props.socket.on('tasks-fetched', (tasks) => {
      console.log('---> TASKS', tasks)
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
    // this.props.createTask(this.state.text, this.props.list_id)
    this.props.socket.emit('create-task', { listId: this.props.list_id, text: this.state.text })
  }

  onEditListName() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  saveListName() {
    this.props.saveListName(false)
  }

  render() {
<<<<<<< HEAD
    // console.log(this.props)
=======
    var tasks = this.state.tasks || this.props.tasks
>>>>>>> Fix rendering of tasks
    return (
      <div>
        <div>
          <h4 onClick={ this.onEditListName }>{ this.props.listname }</h4>
          { this.state.isEditing &&
            <div>
              <input type='text' value=''/>
              <button>Save</button>
            </div>
          }
        </div>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateTask }>CREATE TASK</button>

<<<<<<< HEAD
        { this.props.tasks.map((task, index) =>
=======
        { tasks.map((task, index) =>
>>>>>>> Fix rendering of tasks
          <Task
            key={ index }
            text={ task.text }
            // assigned={ this.state.assigned }
          />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
<<<<<<< HEAD
    ...state.list,
<<<<<<< HEAD
    list_id: state.list.id
=======
    tasks: state.task.tasks
>>>>>>> Create task from client to db
=======
    ...state.list
>>>>>>> Fix rendering of tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
<<<<<<< HEAD
    createTask: (taskname, list_id) => {
      dispatch(createTask(taskname, list_id))
    }
=======
    // createTask: (taskname, list_id) => { dispatch(createTask(taskname, list_id)) },
    tasksFetched: (tasks) => { dispatch(tasksFetched(tasks)) }
>>>>>>> Create task from client to db
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
