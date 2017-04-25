import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { Segment } from 'semantic-ui-react'
import flow from 'lodash.flow'

const cardSource = {
  beginDrag(props, monitor, component) {
    console.log(props.task_id)
    return {
      id: props.task_id,
      x: props.x,
      y: props.y
    }
  }
}

const cardTarget = {
  // canDrop() {
  //   return false
  // },
  drop(props, monitor, component) {
    const { x: currentX } = monitor.getItem()
    const { y: currentY } = monitor.getItem()
    const nextX = props.x
    const nextY = props.y
    props.moveTask(currentX, currentY, nextX, nextY)
  }
}

// const collectDragSource = (connectDragSource, monitor) => {
//   return {
//     connectDragSource: connectDragSource.dragSource(),
//     isDragging: monitor.isDragging()
//   }
// }

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
    this.props.socket.emit('delete-task', {
      task_id: this.props.task_id,
      list_id: this.props.list_id
    })
  }

  render() {
    var upArrow = '\u25B2'
    var downArrow = '\u25BC'
    console.log(this.props.didDrop)
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
              <button className="ui blue right icon button" onClick={ this.updateTask }><i className="thumbs up icon"></i>
              </button>
              <button className="ui red icon button" onClick={ this.deleteTask }><i className="trash icon"></i>
              </button>
              {/*<button onClick={ this.props.moveTaskVertical.bind(null, 'up', this.props.task_id)}>{ upArrow }</button>
              <button onClick={ this.props.moveTaskVertical.bind(null, 'down', this.props.task_id)}>{ downArrow }</button>*/}
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