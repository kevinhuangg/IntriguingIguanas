import React from 'react'
import List from './List.jsx'
import { connect } from 'react-redux'
import { listsFetched } from '../actions/List.js'
import io from 'socket.io-client'


const socket = io()

export class BoardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: '',
      socket: null,
      board_id: this.props.params.taskBoardId,
      boardName: this.props.params.boardName
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateList = this.onCreateList.bind(this)

    socket.on('update-board', (res) => {
      this.props.listsFetched(res.rows)
    })
  }

  componentWillMount() {
    var socket = io();
    this.setState({
      socket: socket
    }, () => {
      this.state.socket.emit('join-board', { taskBoardId: this.state.board_id })
    });
    socket.emit('join-board',
      { taskBoardId: this.props.board_id }
    )
  }

  componentWillUnmount() {
    socket.emit('disconnect');
  }

  onInputChange(e) {
    this.setState({
      listName: e.target.value
    })
  }

  onCreateList() {
    socket.emit('create-list', { boardId: this.state.board_id, name: this.state.listName })
  }

  render() {
    return (
      <div>
        <h3>{ this.state.boardName }</h3>
        <input value={ this.state.listName } onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateList }>CREATE LIST</button>

        { this.props.lists.map((list, index) =>
          <List
            key={ index }
            socket = { socket }
            listname={ list.listname }
            list_id={ list.id }
            index={ index }
          />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list,
    board_id: state.list.board_id,
    lists: state.list.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listsFetched: (lists) => { dispatch(listsFetched(lists)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
