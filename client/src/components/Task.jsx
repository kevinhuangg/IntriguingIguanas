import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { Segment } from 'semantic-ui-react'
import flow from 'lodash.flow'

const cardSource = {
  beginDrag(props, monitor, component) {
    return {
      id: props.task_id,
      x: props.x,
      y: props.y
    }
  }
}

const cardTarget = {
  drop(props, monitor, component) {
    const { x: currentX } = monitor.getItem()
    const { y: currentY } = monitor.getItem()
    const nextX = props.x
    const nextY = props.y

    //Calculate new task order and new list id -> emit to database
    var new_task_order;
    var taskMax = props.lists[nextX].tasks[nextY].task_order
    var task_id = props.lists[currentX].tasks[currentY].id
    var list_id = props.lists[nextX].listId
    var board_id = props.lists[nextX].board_id
    if (nextY === 0 ) {
      new_task_order = taskMax/2
    } else if (props.lists[nextX].tasks[nextY+1]) {
      new_task_order = (((props.lists[nextX].tasks[nextY-1].task_order)+taskMax)/2)
    } else {
      new_task_order = taskMax * 2
    }
    props.socket.emit('task-order-update', {task_id: task_id, list_id: list_id, board_id: board_id, new_task_order: Math.round(new_task_order)})

    props.moveTask(currentX, currentY, nextX, nextY)
  }
}

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
      board_id: this.props.board_id,
      newText: this.state.newTaskTextInput
    })
    this.setState({
      newTaskTextInput: '',
      isEditing: false
    })
  }

  deleteTask() {
    this.props.socket.emit('delete-task', {
      task_id: this.props.task_id,
      board_id: this.props.board_id
    })
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props

    return connectDragSource(connectDropTarget(
      <div>
        <div onClick={ this.isEditing }>
          • { this.props.text }
        </div>
        { this.state.isEditing &&
          <div>
            <div className="ui fluid action input">
              <input type='text' value={ this.state.newTaskTextInput } onChange={ this.onTaskTextInputChange }/>
              <button className="ui green right icon button" onClick={ this.updateTask }><i className="checkmark icon"></i>
              </button>
              <button className="ui red icon button" onClick={ this.deleteTask }><i className="trash icon"></i>
              </button>
            </div>
          </div>
        }
      </div>
    ))
  }
}

export default flow(
  DropTarget('card', cardTarget, connectDragSource => ({
    connectDropTarget: connectDragSource.dropTarget()
  })),
  DragSource('card', cardSource, (connectDragSource, monitor) => ({
    connectDragSource: connectDragSource.dragSource(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop()
  }))
)(Task)