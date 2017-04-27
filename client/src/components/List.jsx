import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import Task from './Task.jsx'
import flow from 'lodash.flow'

import {
  Grid,
  Card,
  Menu,
  Segment,
  Header
} from 'semantic-ui-react'

const listSource = {
  beginDrag(props) {
    const item = { id: props.list_id, x: props.x }
    return item
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
  }
}

const listTarget = {
  drop(props, monitor) {
    const { id: listId } = monitor.getItem()
    const { x: currentX } = monitor.getItem()
    const { x: nextX } = props;
    if (currentX !== nextX ) {
      props.moveList(listId, nextX)
    }
  }
}

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newListName: '',
      text: '',
      isEditing: false,
    }
    this.onTaskInputChange = this.onTaskInputChange.bind(this)
    this.addTask = this.addTask.bind(this)

    this.isEditingListName = this.isEditingListName.bind(this)
    this.onListNameInputChange = this.onListNameInputChange.bind(this)
    this.updateListName = this.updateListName.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.findIndexOfTask = this.findIndexOfTask.bind(this)
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
      listname: this.state.newListName,
      board_id: this.props.board_id
    })
    this.setState({
      newListName: '',
      isEditing: false
    })
  }

  deleteList() {
    this.props.socket.emit('delete-list', {
      list_id: this.props.list_id,
      board_id: this.props.board_id
    })
  }

  // ---------- ADD TASK ----------
  onTaskInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  addTask() {
    if (this.state.text !== '') {
      this.props.socket.emit('add-task', {
        list_id: this.props.list_id,
        text: this.state.text,
        board_id: this.props.board_id
      })
      this.setState({
        text: ''
      })
    }
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

  render() {
    const { connectDragSource, connectDropTarget, isDragging, item, x } = this.props
    console.log()

    return connectDragSource(connectDropTarget(
      <div>
        <Card className='list'>
          {/* ----- LIST NAME ----- */}
          <Card.Content className='list-header'>
          <Card.Header>
            <Header color='blue' onClick={ this.isEditingListName }>
              { this.props.listname }
            </Header>
            { this.state.isEditing &&
              <div>
              <div className="ui fluid action input">
                <input type='text' value={ this.state.newListName } onChange={ this.onListNameInputChange }/>
                <button className="ui green right icon button" onClick={ this.updateListName }><i className="checkmark icon"></i>
                </button>
                <button className="ui red icon button" onClick={ this.deleteList }><i className="trash icon"></i>
                </button>
              </div>
              </div>
            }
          </Card.Header>
          </Card.Content>

          {/* ----- TASKS ----- */}
          <Card.Content className='tasks'>
          { this.props.item.tasks.map((task, i) =>
            <Segment className='task' key={ task.id }>
            <Task
              text={ task.text }
              board_id={ this.props.board_id }
              list_id={ task.list_id }
              task_id={ task.id }
              lists={ this.props.lists }
              socket={ this.props.socket }
              moveTask={ this.props.moveTask }
              moveTaskVertical={ this.moveTaskVertical }
              item={ task }
              x={ x }
              y={ i }
            />
            </Segment>
          )}
          </Card.Content>

          {/* ----- ADD TASK ----- */}
          <Card.Content>
            <div className="ui fluid action input add-task">
            <input onChange={ this.onTaskInputChange } value={ this.state.text } />
            <button className="ui blue icon button" onClick={ this.addTask }>
            <i className="plus icon"></i></button>
            </div>
          </Card.Content>

        </Card>
      </div>
    ))
  }
}

export default flow(
  DropTarget('list', listTarget, connectDragSource => ({
    connectDropTarget: connectDragSource.dropTarget()
  })),
  DragSource('list', listSource, (connectDragSource, monitor) => ({
    connectDragSource: connectDragSource.dragSource(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop()
  }))
)(List)
