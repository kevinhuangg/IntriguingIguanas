import React from 'react'

export class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTaskTextInput: '',
      isEditing: false
    }

    this.isEditing = this.isEditing.bind(this)
    this.onTaskTextInputChange = this.onTaskTextInputChange.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

// ---------- EDIT/DELETE TASKS ----------
  isEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onTaskTextInputChange(e) {
    this.setState({
      newTaskTextInput: e.target.value
    })
  }

  updateTask() {
    this.props.socket.emit('update-task', {
      task_id: this.props.task_id,
      list_id: this.props.list_id,
      newText: this.state.newTaskTextInput
    })
    this.setState({
      newTaskTextInput: '',
      isEditing: false
    })
  }

  deleteTask() {

  }

  render() {
    return (
      <div>
        <div onClick={ this.isEditing }>
          { this.props.text }
        </div>
        { this.state.isEditing &&
          <div>
          <input type='text' value={ this.state.newTaskTextInput } onChange={ this.onTaskTextInputChange }/>
          <button onClick={ this.updateTask }>SAVE</button>
          <button onClick={ this.deleteTask }>DELETE</button>
          </div>
        }
      </div>
    )
  }
}

export default Task