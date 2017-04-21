import React from 'react'
import Task from './Task.jsx'

import {
  Grid,
  Card,
  Menu,
  Segment,
  Header
} from 'semantic-ui-react'

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
    this.findIndexOfTask = this.findIndexOfTask.bind(this)
    this.moveTaskVertical = this.moveTaskVertical.bind(this)

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

  // ----------MOVING TASK ----------
  findIndexOfTask(task_id) {
    var indexOfSource = undefined;
    this.state.tasks.map((task, index) => {
      if (task.id === task_id) {
        indexOfSource = index;
      }
    })
    return indexOfSource
  }

  moveTaskVertical(direction, task_id) {
    var indexOfSource = this.findIndexOfTask(task_id);
    var data = {
      array: [ this.state.tasks[indexOfSource] ]
    }
    if (direction === 'up') {
      data.array.push(this.state.tasks[indexOfSource - 1])
    } else if (direction === 'down') {
      data.array.push(this.state.tasks[indexOfSource + 1])
    }
    this.props.socket.emit('task-order-update-vertical', data);
  }

  render() {
    var leftArrow = '\u25C0'
    var rightArrow = '\u25B6'

    return (
      <div>
        <Card className='list'>
          {/* ----- LIST NAME ----- */}
          <Card.Content className='list-header'>
          <Card.Header>
            <Header color='blue' onClick={ this.isEditingListName }>
              { this.state.currentListName }
            </Header>
            { this.state.isEditing &&
              <div>
              <div className="ui fluid action input">
                <input type='text' value={ this.state.newListName } onChange={ this.onListNameInputChange }/>
                <button className="ui blue right icon button" onClick={ this.updateListName }><i className="thumbs up icon"></i>
                </button>
                <button className="ui red icon button" onClick={ this.deleteList }><i className="trash icon"></i>
                </button>
              </div>
              <div>
              {/*<button className="ui blue icon button" onClick={ this.props.moveList.bind(null, 'left', this.props.list_id) }>{leftArrow}</button>
              <button className="ui blue icon button" onClick={ this.props.moveList.bind(null, 'right', this.props.list_id) }>{rightArrow}</button>*/}
              </div>
              </div>
            }
          </Card.Header>
          </Card.Content>

          {/* ----- TASKS ----- */}
          <Card.Content>
          { this.state.tasks.map(task =>
            <Segment className='task' key={ task.id }>
            <Task
              text={ task.text }
              task_id={ task.id }
              list_id={ task.list_id }
              socket={ this.props.socket }
              moveTaskVertical={ this.moveTaskVertical }

              // assigned={ task.assigned }
            />
            </Segment>
          )}

          {/* ----- ADD TASK ----- */}
          <div className="ui fluid action input add-task">
          <input onChange={ this.onTaskInputChange } value={ this.state.text } />
          <button className="ui blue icon button" onClick={ this.addTask }>
          <i className="plus icon"></i></button>
          </div>
          </Card.Content>

        </Card>
      </div>
    )
  }
}

export default List
