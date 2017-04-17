import React from 'react'
import List from './List.jsx'
import { connect } from 'react-redux'
import { listsFetched } from '../actions/List.js'
import io from 'socket.io-client'

export class BoardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: '',
      socket: null,
      board_id: this.props.params.board_id,
      boardName: this.props.params.boardName
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateList = this.onCreateList.bind(this)
  }

  componentWillMount() {
    const socket = io()
    this.setState({
      socket: socket
    })
    socket.emit('join-board', { board_id: this.state.board_id }
    )
  }

  componentDidMount() {
    this.state.socket.on('update-board', (res) => {
      this.props.listsFetched(res.rows)
    })
  }

  componentWillUnmount() {
    this.state.socket.emit('disconnect');
  }

  onInputChange(e) {
    this.setState({
      listName: e.target.value
    })
  }

  onCreateList() {
    this.state.socket.emit('create-list', { board_id: this.state.board_id, name: this.state.listName })
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <h3>{ this.state.boardName }</h3>
=======
        <h3>{ this.state.boardname }</h3>
>>>>>>> Fix socket (dis)connection as leaving BoardPage component
        <input value={ this.state.listName } onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateList }>CREATE LIST</button>

        { this.props.lists.map((list, index) =>
          <List
            key={ index }
            socket = { this.state.socket }
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
