import React from 'react'
import List from './List.jsx'
import { connect } from 'react-redux'
import { createList, listsFetched } from '../actions/List.js'
import io from 'socket.io-client'

export class BoardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateList = this.onCreateList.bind(this)
    
    var socket = this.props.route.socket

    socket.on('update-board', (res) => {
      this.props.listsFetched(res.rows)
    })
  }

  componentWillMount() {
    var socket = io();
    socket.emit('join-board', { taskBoardId: this.props.board_id })
  }

  onInputChange(e) {
    this.setState({
      listName: e.target.value
    })
  }

  onCreateList() {
    var socket = this.props.route.socket
    socket.emit('create-list', { boardId: this.props.board_id, name: this.state.listName })
  }

  render() {
    return (
      <div>
        <h3>{ this.props.boardname }</h3>
        <input value={ this.state.listName } onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateList }>CREATE LIST</button>

        { this.props.lists.map((list, index) =>
          <List
            key={ index }
            socket = { this.props.route.socket }
            listname={ list.listname }
            index={ index }
          />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list,
    board_id: state.list.id,
    lists: state.list.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (boardname, board_id) => { dispatch(createList(boardname, board_id)) },
    listsFetched: (lists) => { dispatch(listsFetched(lists)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
